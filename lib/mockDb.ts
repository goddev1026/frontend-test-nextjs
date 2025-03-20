import { Lead, LeadFormData } from "@/app/types";

class MockDatabase {
  private leads: Lead[] = [];

  async createLead(data: LeadFormData): Promise<Lead> {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
      resumeUrl: data.resume ? URL.createObjectURL(data.resume) : undefined,
    };
    this.leads.push(newLead);
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return [...this.leads].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateLead(id: string, status: Lead["status"]): Promise<Lead | null> {
    const leadIndex = this.leads.findIndex((lead) => lead.id === id);
    if (leadIndex === -1) {
      return null;
    }

    this.leads[leadIndex] = {
      ...this.leads[leadIndex],
      status,
      updatedAt: new Date(),
    };

    return this.leads[leadIndex];
  }
}

// Create a singleton instance
export const mockDb = new MockDatabase();
