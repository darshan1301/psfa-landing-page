import prisma from "@/lib/db";

export async function GET() {
  try {
    const academies = await prisma.sportsAcademy.findMany({
      where: { isActive: true },
      include: {
        batches: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(academies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching sports academies:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch sports academies" }),
      { status: 500 }
    );
  }
}
