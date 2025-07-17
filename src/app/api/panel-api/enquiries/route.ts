import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  let body: {
    id?: string;
    status: "NEW" | "RESOLVED" | "CLOSED" | "IN_PROGRESS";
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { id, status } = body;
  if (!id || !status) {
    return NextResponse.json(
      { error: "Both `id` and `status` are required" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { id } = body;
  if (!id) {
    return NextResponse.json(
      { error: "`id` is required to delete an enquiry" },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.enquiry.delete({
      where: { id },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
