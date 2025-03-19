import { Lead, LeadFormData } from "../types";

// Mock data store
let leads: Lead[] = [];

export const leadService = {
  async createLead(formData: LeadFormData): Promise<Lead> {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
      resumeUrl: formData.resume
        ? URL.createObjectURL(formData.resume)
        : undefined,
    };
    leads.push(newLead);
    return newLead;
  },

  async getLeads(): Promise<Lead[]> {
    return leads;
  },

  async updateLeadStatus(id: string, status: Lead["status"]): Promise<Lead> {
    const lead = leads.find((l) => l.id === id);
    if (!lead) {
      throw new Error("Lead not found");
    }
    lead.status = status;
    lead.updatedAt = new Date();
    return lead;
  },
};
