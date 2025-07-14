import prisma from "@/lib/db";
import { deleteFromS3 } from "@/lib/generatePresignedUrl";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, membership, comment, image } = data;

    if (!name || !membership || !comment || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        membership,
        comment,
        image,
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, name, membership, comment, image } = data;

    if (!id || !name || !membership || !comment || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Step 1: Get existing testimonial
    const existing = await prisma.testimonial.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    // Step 2: Delete old image if it changed
    if (existing.image && existing.image !== image) {
      try {
        await deleteFromS3(existing.image);
      } catch (err) {
        console.warn("Old image deletion failed", err);
      }
    }

    // Step 3: Update testimonial
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        membership,
        comment,
        image,
      },
    });

    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
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

    const testimonial = await prisma.testimonial.delete({
      where: { id },
    });

    // Delete image from S3 if it exists
    if (testimonial.image) {
      try {
        await deleteFromS3(testimonial.image);
      } catch (err) {
        console.warn("Image deletion failed", err);
      }
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
