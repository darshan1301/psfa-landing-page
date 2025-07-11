import prisma from "@/lib/db";
// app/api/panel-api/sports-academy/[academyId]/batches/route.ts
import { NextResponse } from "next/server";

export interface BatchPayload {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  sport: string;
  headCoach: string;
  description?: string;
  academyId?: string; // Optional for POST, required for PUT
}

export async function POST(request: Request) {
  try {
    const payload: BatchPayload = await request.json();
    // console.log(payload);
    const {
      academyId,
      name,
      startDate,
      endDate,
      startTime,
      endTime,
      sport,
      headCoach,
      description,
    } = payload;

    // Basic validation
    if (!name || !startDate || !startTime || !endDate || !sport || !headCoach) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const batch = await prisma.batch.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime: startTime,
        endTime: endTime,
        sport,
        headCoach,
        description,
        sportsAcademy: { connect: { id: academyId } },
      },
    });

    return NextResponse.json(batch, { status: 201 });
  } catch (error) {
    console.error("Error creating batch:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export interface BatchUpdatePayload {
  academyId: string;
  batchId: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  sport?: string;
  headCoach?: string;
  description?: string | null;
}

export async function PUT(request: Request) {
  try {
    const payload: BatchUpdatePayload = await request.json();
    const {
      academyId,
      batchId,
      name,
      startDate,
      startTime,
      endTime,
      endDate,
      sport,
      headCoach,
      description,
    } = payload;

    if (!academyId || !batchId) {
      return NextResponse.json(
        { error: "academyId and batchId are required" },
        { status: 400 }
      );
    }
    // Build the data object dynamically:
    const data: Record<string, unknown> = {};
    if (name) data.name = name;
    if (startDate) data.startDate = new Date(startDate);
    if (startTime) data.startTime = startTime;
    if (endTime) data.endTime = endTime;
    if (endDate) data.endDate = new Date(endDate);
    if (sport) data.sport = sport;
    if (headCoach) data.headCoach = headCoach;
    if (description !== undefined) data.description = description;
    if (description !== undefined) data.description = description;

    // Use updateMany to ensure the batch belongs to the given academy
    const result = await prisma.batch.updateMany({
      where: {
        id: batchId,
        sportsAcademyId: academyId,
      },
      data,
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "No batch found for this academyId/batchId pair" },
        { status: 404 }
      );
    }

    // Fetch and return the updated batch
    const updated = await prisma.batch.findUnique({
      where: { id: batchId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating batch:", error);
    return NextResponse.json(
      { error: "Failed to update batch" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { batchId } = await request.json();

    if (!batchId) {
      return NextResponse.json(
        { error: "batchId is required" },
        { status: 400 }
      );
    }

    await prisma.batch.delete({
      where: { id: batchId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting batch:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
