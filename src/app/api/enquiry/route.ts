import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Email and phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (!emailRegex.test(email)) {
      return new NextResponse("Invalid email format", { status: 400 });
    }

    if (phone && !phoneRegex.test(phone)) {
      return new NextResponse("Invalid phone number format", { status: 400 });
    }

    // Abusive word detection (customize this list as needed)
    const abusiveWords = [
      "abuse1",
      "abuse2",
      "abuse3",
      "idiot",
      "stupid",
      "dumb",
    ]; // Example list
    const abusiveRegex = new RegExp(`\\b(${abusiveWords.join("|")})\\b`, "i");

    if (abusiveRegex.test(message)) {
      return new NextResponse("Message contains inappropriate language", {
        status: 400,
      });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        message,
        phone: phone || null,
      },
    });

    return new NextResponse(JSON.stringify(enquiry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
