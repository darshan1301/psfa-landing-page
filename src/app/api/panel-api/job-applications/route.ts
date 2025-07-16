import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.jobApplication.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        jobPosition: {
          select: {
            title: true,
          },
        },
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

export async function PATCH(request: Request) {
  try {
    // Extract the ID from the URL path
    // Parse the request body
    const body = await request.json();
    const { status, applicationId } = body;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["APPLIED", "REVIEWED", "ACCEPTED", "REJECTED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error:
            "Invalid status. Must be one of: APPLIED, REVIEWED, ACCEPTED, REJECTED",
        },
        { status: 400 }
      );
    }

    // Check if application exists
    const existingApplication = await prisma.jobApplication.findUnique({
      where: { id: applicationId },
    });

    if (!existingApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Update the application status
    const updatedApplication = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status },
      include: {
        jobPosition: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 }
    );
  }
}
