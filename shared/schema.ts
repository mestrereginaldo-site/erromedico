import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  errorType: text("error_type").notNull(),
  severity: text("severity").notNull(),
  expenses: integer("expenses").notNull(),
  income: integer("income"),
  age: integer("age"),
  receiveWhatsapp: integer("receive_whatsapp").default(0),
  calculationResult: json("calculation_result").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
