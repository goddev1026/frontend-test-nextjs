import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";
import { LeadFormData } from "@/app/types";

export async function POST(request: Request) {
  try {
    const data: LeadFormData = await request.json();
    const lead = await mockDb.createLead(data);
    return NextResponse.json(lead);
  } catch (error) {
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
