import AllSports from "@/components/Allsports";
import ContactForm from "@/components/SubscribeForm";
import ServicesSection from "@/components/ServicesSection";
import prisma from "@/lib/db";
import WhyPsfaSection from "@/components/WhyPsfaSection";
import ServicesCards from "@/components/ServicesCards";

export const metadata = {
  title: "Pratigrham Sports For All",
  description:
    "Description - Pratigrham Sports is Nagpur’s leading sports management company offering venue booking, expert coaching, quality gear, and infrastructure management. Join our Annual Sports Training Program (ASTP) to build skills and confidence through multi-sport training and school initiatives. Experience top cricket, football, and pickleball facilities with us.",
  keywords: [
    "nagpur sports",
    "sports facility booking nagpur",
    "pickleball court nagpur",
    "multi-sport hub nagpur",
    "community sports events nagpur",
    "sports clubs in nagpur",
    "cricket clubs nagpur",
    "football training nagpur",
    "sports gear nagpur",
    "sports infrastructure nagpur",
    "affordable cricket academy nagpur",
    "school sports awareness program nagpur",
    "specialized training program",
    "annual sports training program nagpur",
    "kids sports coaching nagpur",
    "sports club nagpur",
    "sports complex in nagpur",
    "national sport of india",
    "nagpur",
    "sports shop nagpur",
    "orange city sports",
    "sports club membership nagpur",
    "best sports clubs india",
    "sports management company india",
    "sports management company nagpur",
    "sports facility management india",
    "sports nagpur",
  ],
  openGraph: {
    title: "Home, Pratigrham Sports For All",
    description:
      "Description - Pratigrham Sports is Nagpur’s leading sports management company offering venue booking, expert coaching, quality gear, and infrastructure management. Join our Annual Sports Training Program (ASTP) to build skills and confidence through multi-sport training and school initiatives. Experience top cricket, football, and pickleball facilities with us.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/apple-touch-icon.png`,
        width: 108,
        height: 108,
        alt: "Pratigrham Sports For All",
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
