import prisma from "@/lib/db";
import { deleteFromS3 } from "@/lib/generatePresignedUrl";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const milestones = await prisma.milestone.findMany({
      orderBy: {
        year: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        year: true,
      },
    });

    return NextResponse.json(milestones);
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return NextResponse.json(
      { error: "Failed to fetch milestones" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, image, year } = data;

    if (!title || !description || !image || !year) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newMilestone = await prisma.milestone.create({
      data: {
        title,
        description,
        image,
        year,
      },
    });

    return NextResponse.json(newMilestone, { status: 201 });
  } catch (error) {
    console.error("Error creating milestone:", error);
    return NextResponse.json(
      { error: "Failed to create milestone" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Milestone ID is required" },
        { status: 400 }
      );
    }

    const milestone = await prisma.milestone.findUnique({ where: { id } });

    if (!milestone) {
      return NextResponse.json(
        { error: "Milestone not found" },
        { status: 404 }
      );
    }

    // Delete from S3
    const result = await deleteFromS3(milestone.image);
    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    // Delete from DB
    const deletedMilestone = await prisma.milestone.delete({ where: { id } });

    return NextResponse.json(deletedMilestone, { status: 200 });
  } catch (error) {
    console.error("Error deleting milestone:", error);
    return NextResponse.json(
      { error: "Failed to delete milestone" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, title, description, image, year } = data;

    if (!id || !title || !description || !image || !year) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedMilestone = await prisma.milestone.update({
      where: { id },
      data: {
        title,
        description,
        image,
        year,
      },
    });

    return NextResponse.json(updatedMilestone, { status: 200 });
  } catch (error) {
    console.error("Error updating milestone:", error);
    return NextResponse.json(
      { error: "Failed to update milestone" },
      { status: 500 }
    );
  }
}
