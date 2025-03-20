import { NextResponse } from "next/server";
import { mockDb } from "@/lib/mockDb";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const lead = await mockDb.updateLead(params.id, status);
    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}
