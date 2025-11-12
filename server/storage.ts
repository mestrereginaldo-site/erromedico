import { leads, type Lead, type InsertLead } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  insertLead(lead: Omit<InsertLead, "id">): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
}

// Classe de armazenamento em memória (mantida como fallback)
export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  currentId: number;

  constructor() {
    this.leads = new Map();
    this.currentId = 1;
  }

  async insertLead(leadData: Omit<InsertLead, "id">): Promise<Lead> {
    const id = this.currentId++;
    // Garantir que valores opcionais não sejam undefined
    const preparedData = {
      ...leadData,
      income: leadData.income ?? null,
      age: leadData.age ?? null,
      receiveWhatsapp: leadData.receiveWhatsapp ?? 0
    };
    const lead: Lead = { ...preparedData, id };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }
}

// Nova implementação usando banco de dados PostgreSQL
export class DatabaseStorage implements IStorage {
  async insertLead(leadData: Omit<InsertLead, "id">): Promise<Lead> {
    try {
      // Garantir que valores opcionais não sejam undefined
      const preparedData = {
        ...leadData,
        income: leadData.income ?? null,
        age: leadData.age ?? null,
        receiveWhatsapp: leadData.receiveWhatsapp ?? 0
      };
      
      const [lead] = await db.insert(leads).values(preparedData).returning();
      return lead;
    } catch (error) {
      console.error("Erro ao inserir lead no banco de dados:", error);
      // Fallback para armazenamento em memória se houver erro
      const memStorage = new MemStorage();
      return memStorage.insertLead(leadData);
    }
  }

  async getLeads(): Promise<Lead[]> {
    try {
      return await db.select().from(leads).orderBy(leads.id);
    } catch (error) {
      console.error("Erro ao buscar leads do banco de dados:", error);
      // Retorna array vazio em caso de erro
      return [];
    }
  }
}

// Usa armazenamento em banco de dados
export const storage = new DatabaseStorage();
