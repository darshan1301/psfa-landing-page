import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.jobPosition.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const jobData = await request.json();
    const newJob = await prisma.jobPosition.create({
      data: jobData,
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    await prisma.jobPosition.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const jobData = await request.json();
    const { id, ...updateFields } = jobData;
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Valid Job ID is required" },
        { status: 400 }
      );
    }

    const updatedJob = await prisma.jobPosition.update({
      where: { id },
      data: updateFields,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}
