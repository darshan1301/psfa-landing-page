import prisma from "@/lib/db";
import { deleteFromS3 } from "@/lib/generatePresignedUrl";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, image } = await request.json();

    // Validate input
    if (!name || !image) {
      return NextResponse.json(
        { error: "Name and image URL are required" },
        { status: 400 }
      );
    }

    // Create new sport in the database
    const newSport = await prisma.sport.create({
      data: {
        name,
        image: image,
      },
    });

    return NextResponse.json(newSport, { status: 201 });
  } catch (error) {
    console.error("Error creating sport:", error);
    return NextResponse.json(
      { error: "Failed to create sport" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch all sports from the database
    const sports = await prisma.sport.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sports, { status: 200 });
  } catch (error) {
    console.error("Error fetching sports:", error);
    return NextResponse.json(
      { error: "Failed to fetch sports" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Delete the sport and get its image in one step
    const deletedSport = await prisma.sport.delete({
      where: { id },
    });

    // Delete image from S3
    if (deletedSport.image) {
      const result = await deleteFromS3(deletedSport.image);
      if (!result.success) {
        return NextResponse.json({ error: result.message }, { status: 500 });
      }
    }

    return NextResponse.json(
      { message: "Sport and associated image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting sport:", error);
    return NextResponse.json(
      { error: "Failed to delete sport" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, name, image, status } = data;

    // Validate input
    if (!id || !name || !image) {
      return NextResponse.json(
        { error: "ID, name, status and image URL are required" },
        { status: 400 }
      );
    }

    // Update sport in the database
    const updatedSport = await prisma.sport.update({
      where: { id },
      data: {
        name,
        image,
        status,
      },
    });

    return NextResponse.json(updatedSport, { status: 200 });
  } catch (error) {
    console.error("Error updating sport:", error);
    return NextResponse.json(
      { error: "Failed to update sport" },
      { status: 500 }
    );
  }
}
