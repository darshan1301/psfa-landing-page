import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const infrastructures = await prisma.sportsInfrastructure.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return new Response(JSON.stringify(infrastructures), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching infrastructures:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, location, description, Area, images, Amenities } = body;

    if (!name || !location || !description || !images?.length) {
      return NextResponse.json(
        { error: "Missing required fields or images" },
        { status: 400 }
      );
    }

    const newInfrastructure = await prisma.sportsInfrastructure.create({
      data: {
        name,
        location,
        description,
        Area: Area || null,
        images,
        Amenities,
      },
    });

    return NextResponse.json(newInfrastructure, { status: 201 });
  } catch (error) {
    console.error("Error creating infrastructure:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, location, description, Area, images, Amenities } = body;

    if (!id || !name || !location || !description || !images?.length) {
      return NextResponse.json(
        { error: "Missing required fields or images" },
        { status: 400 }
      );
    }

    const updatedInfrastructure = await prisma.sportsInfrastructure.update({
      where: { id },
      data: {
        name,
        location,
        description,
        Area: Area || null,
        images,
        Amenities,
      },
    });

    return NextResponse.json(updatedInfrastructure, { status: 200 });
  } catch (error) {
    console.error("Error updating infrastructure:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing infrastructure ID" },
        { status: 400 }
      );
    }

    await prisma.sportsInfrastructure.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Infrastructure deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting infrastructure:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
