import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { emailNumber } = body;

    if (!emailNumber || typeof emailNumber !== "string") {
      return NextResponse.json(
        { success: false, message: "Email or phone number is required" },
        { status: 400 }
      );
    }

    // Trim and normalize input
    const input = emailNumber.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    const isEmail = emailRegex.test(input);
    const isPhone = phoneRegex.test(input);

    if (!isEmail && !isPhone) {
      return NextResponse.json(
        { success: false, message: "Invalid email or phone number format" },
        { status: 400 }
      );
    }

    const subscriber = {
      email: isEmail ? input.toLowerCase() : null,
      phone: isPhone ? input : null,
    };

    // Check if already subscribed
    const whereConditions = [];

    if (subscriber.email) {
      whereConditions.push({ email: subscriber.email });
    }

    if (subscriber.phone) {
      whereConditions.push({ phone: subscriber.phone });
    }

    const existingSubscriber = await prisma.subscriber.findFirst({
      where: {
        OR: whereConditions,
      },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber already exists" },
        { status: 409 }
      );
    }

    const newSubscriber = await prisma.subscriber.create({
      data: subscriber,
    });

    return NextResponse.json(
      { success: true, subscriber: newSubscriber },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating subscriber:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
