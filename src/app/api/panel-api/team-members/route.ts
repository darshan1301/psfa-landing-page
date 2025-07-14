import prisma from "@/lib/db";
import { deleteFromS3 } from "@/lib/generatePresignedUrl";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        role: true,
        description: true,
        image: true,
        yearsOfExperience: true,
      },
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, role, description, image, yearsOfExperience } =
      await request.json();

    if (!name || !role || !description) {
      return NextResponse.json(
        { error: "Name, role, and description are required" },
        { status: 400 }
      );
    }

    const newMember = await prisma.teamMember.create({
      data: {
        name,
        role,
        description,
        image: image || "",
        yearsOfExperience: parseInt(yearsOfExperience) || 0,
      },
    });

    return NextResponse.json(newMember);
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, image } = await request.json();

    if (!id || !image) {
      return NextResponse.json(
        { error: "ID, image are required" },
        { status: 400 }
      );
    }

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        image: image || "",
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
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

    const deletedMember = await prisma.teamMember.delete({
      where: { id },
    });

    await deleteFromS3(deletedMember.image);

    return NextResponse.json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
