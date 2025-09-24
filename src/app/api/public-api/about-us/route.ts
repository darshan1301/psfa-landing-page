import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const milestones = await prisma.milestone.findMany({
      orderBy: { year: "asc" },
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
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
