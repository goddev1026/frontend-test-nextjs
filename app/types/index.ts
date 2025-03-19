export type LeadStatus = "PENDING" | "REACHED_OUT";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinProfile: string;
  visasOfInterest: string[];
  resumeUrl?: string;
  additionalInfo?: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  citizenship: string;
  linkedinProfile: string;
  visasOfInterest: string[];
  resume?: File;
  additionalInfo?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}
