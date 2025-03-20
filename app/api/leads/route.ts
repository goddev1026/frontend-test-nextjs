import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";
import { LeadFormData } from "@/app/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract file and other data from formData
    const resume = formData.get("resume") as File;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const citizenship = formData.get("citizenship") as string;
    const linkedinProfile = formData.get("linkedinProfile") as string;
    const visasOfInterest = JSON.parse(
      formData.get("visasOfInterest") as string
    );
    const additionalInfo = formData.get("additionalInfo") as string;

    // Create lead data object
    const leadData: LeadFormData = {
      firstName,
      lastName,
      email,
      citizenship,
      linkedinProfile,
      visasOfInterest,
      resume,
      additionalInfo,
    };

    const lead = await mockDb.createLead(leadData);
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await mockDb.getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
