import AllSports from "@/components/Allsports";
import ContactForm from "@/components/SubscribeForm";
import ServicesSection from "@/components/ServicesSection";
import prisma from "@/lib/db";
import WhyPsfaSection from "@/components/WhyPsfaSection";
import ServicesCards from "@/components/ServicesCards";

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
        width: 108,
        height: 108,
        alt: "Home Page Image",
      },
    ],
  },
};

const videoSrc = "./psfa-vid.mp4";

export default async function Home() {
  const [sports] = await Promise.all([
    prisma.sport.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        image: true,
        status: true,
      },
      where: {
        status: true,
      },
    }),
  ]);

  return (
    <div className="">
      <main className="">
        <div className="lg:w-full lg:h-fit h-screen overflow-hidden">
          <video
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="h-screen lg:h-auto object-cover w-full">
            Your browser does not support the video tag.
          </video>
        </div>
        <ServicesSection />
        <ServicesCards />
        <WhyPsfaSection />
        {/* <hr className="border-t border-2 border-gray-300 mx-8" /> */}
        <AllSports sports={sports || []} />
        {/* <AnimatedTestimonials testimonials={testimonials || []} /> */}
        <ContactForm />
      </main>
    </div>
  );
}
