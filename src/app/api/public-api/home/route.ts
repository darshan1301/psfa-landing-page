import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [sports, testimonials] = await Promise.all([
      prisma.sport.findMany({
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          image: true,
        },
      }),
      prisma.testimonial.findMany({
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          comment: true,
          image: true,
        },
      }),
    ]);

    return NextResponse.json({ sports, testimonials }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
