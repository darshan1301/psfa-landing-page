import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { deleteFromS3 } from "@/lib/generatePresignedUrl";

export async function POST(request: Request) {
  const { name, location, description, images } = await request.json();
  try {
    // Validate input
    if (
      !name ||
      !location ||
      !description ||
      !Array.isArray(images) ||
      images.length < 1
    ) {
      return NextResponse.json(
        {
          error:
            "Name, location, description, and at least one image URL are required",
        },
        { status: 400 }
      );
    }

    // Pass images as a string array
    const academy = await prisma.sportsAcademy.create({
      data: {
        name,
        location,
        description,
        images: images,
      },
    });

    return NextResponse.json(academy, { status: 201 });
  } catch (error) {
    console.error("Error adding academy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const take = 20;
  const page = pageParam > 0 ? pageParam : 1;
  const skip = (page - 1) * take;

  try {
    // If `id` present, return that single academy with batches
    if (id) {
      const academy = await prisma.sportsAcademy.findUnique({
        where: { id },
        include: { batches: true },
      });
      if (!academy) {
        return NextResponse.json(
          { error: "Academy not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(academy);
    }

    // Otherwise, return paginated list
    const [academies, total] = await prisma.$transaction([
      prisma.sportsAcademy.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.sportsAcademy.count(),
    ]);

    const totalPages = Math.ceil(total / take);

    return NextResponse.json({
      academies,
      pagination: { total, page, totalPages, perPage: take },
    });
  } catch (error) {
    console.error("Error fetching academies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const academy = await prisma.sportsAcademy.delete({
      where: { id },
    });
    await Promise.all(
      academy.images.map(async (image) => {
        // Assuming deleteFromS3 is a function that deletes an image from S3
        await deleteFromS3(image);
      })
    );
    return NextResponse.json(academy, { status: 200 });
  } catch (error) {
    console.error("Error deleting academy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id, name, location, description, images, isActive, batches } =
    await request.json();

  try {
    // Validate input
    if (
      !id ||
      !name ||
      !location ||
      !description ||
      !Array.isArray(images) ||
      images.length < 1
    ) {
      return NextResponse.json(
        {
          error:
            "ID, name, location, description, and at least one image URL are required",
        },
        { status: 400 }
      );
    }

    // Validate batches if provided
    if (batches && Array.isArray(batches)) {
      for (const batch of batches) {
        if (
          !batch.name ||
          !batch.sport ||
          !batch.headCoach ||
          !batch.startDate ||
          !batch.endDate
        ) {
          return NextResponse.json(
            {
              error:
                "Each batch must have name, sport, headCoach, startDate, and endDate",
            },
            { status: 400 }
          );
        }
      }
    }

    // Use transaction to ensure data consistency
    const academy = await prisma.$transaction(async (tx) => {
      // Update academy basic info
      await tx.sportsAcademy.update({
        where: { id },
        data: {
          name,
          location,
          description,
          images: images,
          isActive: isActive !== undefined ? isActive : true,
        },
      });

      // Handle batches if provided
      if (batches && Array.isArray(batches)) {
        // Delete existing batches
        await tx.batch.deleteMany({
          where: { sportsAcademyId: id },
        });

        // Create new batches
        if (batches.length > 0) {
          const batchesToCreate = batches.map((batch) => ({
            name: batch.name,
            sport: batch.sport,
            headCoach: batch.headCoach,
            startDate: new Date(batch.startDate),
            endDate: new Date(batch.endDate),
            startTime: batch.startTime ? batch.startTime : "00:00:00",
            endTime: batch.endTime ? batch.endTime : "00:00:00",
            description: batch.description || null,
            sportsAcademyId: id,
          }));

          await tx.batch.createMany({
            data: batchesToCreate,
          });
        }
      }

      // Return academy with batches
      return await tx.sportsAcademy.findUnique({
        where: { id },
        include: {
          batches: {
            orderBy: { startDate: "asc" },
          },
        },
      });
    });

    return NextResponse.json(academy, { status: 200 });
  } catch (error) {
    console.error("Error updating academy:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
