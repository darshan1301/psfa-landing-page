import prisma from "@/lib/db";

export async function GET() {
  try {
    const infrastructures = await prisma.sportsInfrastructure.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return new Response(JSON.stringify(infrastructures), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching infrastructures:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
