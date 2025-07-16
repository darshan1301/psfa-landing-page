import AllSports from "@/components/Allsports";
import ContactForm from "@/components/SubscribeForm";
import ServicesSection from "@/components/ServicesSection";
import AnimatedTestimonials from "@/components/Testimonials";
import prisma from "@/lib/db";

export const metadata = {
  title: "Pratigrham Sports For All",
  description: "Welcome to our sports community",
  keywords: "sports, community, testimonials, services",
  openGraph: {
    title: "Home",
    description: "Welcome to our sports community",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/apple-touch-icon.png`,
        width: 1200,
        height: 630,
        alt: "Home Page Image",
      },
    ],
  },
};

export const revalidate = 60; // cache for 60 seconds (ISR)

export default async function Home() {
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
        membership: true,
      },
    }),
  ]);

  return (
    <div className="">
      <main className="">
        <div className="lg:w-full lg:h-fit h-screen overflow-hidden">
          <video
            src={"/webvideo-compressed.mp4"}
            width={1920}
            height={1080}
            autoPlay
            preload="none"
            muted
            className="h-screen lg:h-auto object-cover"
          />
        </div>
        <ServicesSection />
        {/* <hr className="border-t border-2 border-gray-300 mx-8" /> */}
        <AllSports sports={sports || []} />
        <AnimatedTestimonials testimonials={testimonials || []} />
        <ContactForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
