import AllSports from "@/components/Allsports";
import ContactForm from "@/components/SubscribeForm";
import ServicesSection from "@/components/ServicesSection";
import AnimatedTestimonials from "@/components/Testimonials";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/public-api/home`,
    {
      next: {
        revalidate: 60, // cache for 60 seconds
      },
    }
  );

  const data = await res.json();
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
        <AllSports sports={data.sports || []} />
        <AnimatedTestimonials testimonials={data.testimonials || []} />
        <ContactForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
