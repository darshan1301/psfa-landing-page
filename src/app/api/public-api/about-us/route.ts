import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [milestones, teamMembers] = await Promise.all([
      prisma.milestone.findMany({
        orderBy: { year: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          year: true,
        },
      }),
      prisma.teamMember.findMany({
        orderBy: { createdAt: "asc" }, // adjust if needed
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
          yearsOfExperience: true,
        },
      }),
    ]);

    return NextResponse.json({ milestones, teamMembers });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
