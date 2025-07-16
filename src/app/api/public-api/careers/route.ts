import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const careers = await prisma.jobPosition.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      jobPositionId,
      resume,
      coverLetter,
      email,
      phone,
      fullName,
      experience,
    } = body;

    // ✅ Basic validation
    if (!jobPositionId || !resume || !email || !fullName || !experience) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Optional: check if the job exists
    const jobExists = await prisma.jobPosition.findUnique({
      where: { id: jobPositionId },
    });

    if (!jobExists) {
      return NextResponse.json(
        { error: "Invalid jobPositionId" },
        { status: 404 }
      );
    }

    // ✅ Create application
    const application = await prisma.jobApplication.create({
      data: {
        jobPositionId,
        resume,
        coverLetter,
        email,
        phone,
        fullName,
        experience,
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
