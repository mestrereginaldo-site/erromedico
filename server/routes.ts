import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import path from "path";
import fs from "fs";

const mailchimpApiKey = process.env.MAILCHIMP_API_KEY || "your_api_key";
const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX || "us1";
const mailchimpListId = process.env.MAILCHIMP_LIST_ID || "your_list_id";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all leads (for admin panel)
  app.get("/api/leads", async (_req, res) => {
    try {
      const leads = await storage.getLeads();
      res.status(200).json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ success: false, message: "Failed to fetch leads" });
    }
  });

  // API route for subscribing to the newsletter and saving lead data
  app.post("/api/subscribe", async (req, res) => {
    try {
      console.log("Recebido requisição para /api/subscribe:", JSON.stringify(req.body));
      
      // Validate the request body
      const bodySchema = z.object({
        userName: z.string().min(1, "Name is required"),
        userEmail: z.string().email("Invalid email address"),
        userPhone: z.string().min(1, "Phone number is required"),
        receiveWhatsapp: z.boolean().default(false),
        calculationResult: z.object({
          moralDamage: z.number(),
          materialDamage: z.number(),
          pension: z.number(),
          total: z.number(),
        }),
        errorType: z.string().optional(),
        severity: z.string().optional(),
        expenses: z.number().optional(),
        income: z.number().optional(),
        age: z.number().optional(),
      });

      const validatedData = bodySchema.parse(req.body);
      console.log("Dados validados com sucesso");
      
      // Store the lead in our database
      const leadData = {
        name: validatedData.userName,
        email: validatedData.userEmail,
        phone: validatedData.userPhone,
        errorType: validatedData.errorType || "not specified",
        severity: validatedData.severity || "not specified",
        expenses: validatedData.expenses || 0,
        income: validatedData.income || 0,
        age: validatedData.age || 0,
        receiveWhatsapp: validatedData.receiveWhatsapp ? 1 : 0,
        calculationResult: validatedData.calculationResult,
        createdAt: new Date().toISOString(),
      };
      
      console.log("Preparando para inserir no banco de dados:", JSON.stringify(leadData));
      const insertedLead = await storage.insertLead(leadData);
      console.log("Lead inserido com sucesso:", JSON.stringify(insertedLead));

      // Integrate with Mailchimp API
      try {
        // Construct the data for Mailchimp
        const mailchimpData = {
          email_address: validatedData.userEmail,
          status: "subscribed",
          merge_fields: {
            FNAME: validatedData.userName.split(' ')[0],
            LNAME: validatedData.userName.split(' ').slice(1).join(' '),
            PHONE: validatedData.userPhone || "",
            TOTAL: validatedData.calculationResult.total.toFixed(2),
          },
          tags: ["Leads Erro Médico"],
        };

        // Make request to Mailchimp API
        const response = await fetch(
          `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${mailchimpApiKey}`,
            },
            body: JSON.stringify(mailchimpData),
          }
        );

        if (!response.ok) {
          console.error("Mailchimp API Error:", await response.text());
        }
      } catch (mailchimpError) {
        console.error("Error with Mailchimp integration:", mailchimpError);
        // We don't want to fail the whole request if just Mailchimp fails
      }

      res.status(200).json({ success: true, message: "Subscription successful" });
    } catch (error) {
      console.error("Subscription error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to process subscription" 
      });
    }
  });
  
  // API route for handling e-book subscription
  app.post("/api/ebook-subscribe", async (req, res) => {
    try {
      // Validate the request body
      const bodySchema = z.object({
        email: z.string().email("Invalid email address")
      });

      const validatedData = bodySchema.parse(req.body);
      
      // Integrate with Mailchimp API for e-book list
      try {
        // Construct data for Mailchimp
        const mailchimpData = {
          email_address: validatedData.email,
          status: "subscribed",
          tags: ["E-book Erro Médico"],
        };

        // Make request to Mailchimp API
        const response = await fetch(
          `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${mailchimpApiKey}`,
            },
            body: JSON.stringify(mailchimpData),
          }
        );

        if (!response.ok) {
          console.error("Mailchimp API Error for e-book:", await response.text());
        }
      } catch (mailchimpError) {
        console.error("Error with Mailchimp integration for e-book:", mailchimpError);
        // We don't want to fail the whole request if just Mailchimp fails
      }

      res.status(200).json({ 
        success: true, 
        message: "E-book subscription successful",
        downloadLink: "/api/download-ebook" // Link atualizado para nosso próprio endpoint
      });
    } catch (error) {
      console.error("E-book subscription error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to process e-book subscription" 
      });
    }
  });
  
  // Endpoint específico para baixar o ebook em PDF
  app.get("/api/download-ebook", (req, res) => {
    const filePath = path.join(process.cwd(), "public", "assets", "indenizacao-erro-medico-guia-completo.pdf");
    
    try {
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=indenizacao-erro-medico-guia-completo.pdf');
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      } else {
        console.error(`Arquivo PDF não encontrado: ${filePath}`);
        res.status(404).send('Arquivo não encontrado');
      }
    } catch (error) {
      console.error('Erro ao tentar baixar o e-book:', error);
      res.status(500).send('Erro ao processar o download do arquivo');
    }
  });
  
  // Endpoint específico para visualizar o ebook em HTML
  app.get("/api/view-ebook", (req, res) => {
    const filePath = path.join(process.cwd(), "public", "assets", "indenizacao-erro-medico-guia-completo.html");
    
    try {
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'text/html');
        const content = fs.readFileSync(filePath, 'utf8');
        res.send(content);
      } else {
        console.error(`Arquivo HTML não encontrado: ${filePath}`);
        res.status(404).send('Arquivo HTML não encontrado');
      }
    } catch (error) {
      console.error('Erro ao tentar visualizar o e-book:', error);
      res.status(500).send('Erro ao processar a visualização do arquivo');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
