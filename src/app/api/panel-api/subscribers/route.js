import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("HIT enquiries GET route");
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
