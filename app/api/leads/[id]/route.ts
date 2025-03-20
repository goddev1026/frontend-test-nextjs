import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure we have the id parameter
    if (!params?.id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // Update the lead
    const lead = await mockDb.updateLead(params.id, status);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}
