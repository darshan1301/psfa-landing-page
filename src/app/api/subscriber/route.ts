import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { emailNumber } = body;

    // Require at least one contact method
    if (!emailNumber) {
      return NextResponse.json(
        { success: false, message: "Either email or phone number is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    let subscriber: {
      email: string | null;
      phone: string | null;
    };

    if (emailRegex.test(emailNumber)) {
      // If it's a valid email make it lowercase
      subscriber = { email: emailNumber.toLowercase(), phone: null };
    } else if (phoneRegex.test(emailNumber)) {
      subscriber = { phone: emailNumber, email: null };
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid email or phone number format" },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscriber.findFirst({
      where: {
        OR: [
          ...(subscriber.email ? [{ email: subscriber.email }] : []),
          ...(subscriber.phone ? [{ phone: subscriber.phone }] : []),
        ],
      },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber already exists" },
        { status: 409 }
      );
    }

    const newsubscriber = await prisma.subscriber.create({
      data: subscriber,
    });

    return NextResponse.json(
      { success: true, subscriber: newsubscriber },
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
