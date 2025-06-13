"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

import {
  School,
  Dumbbell,
  Building2,
  ShoppingCart,
  MapPin,
  CheckCircle,
  ArrowRight,
  Trophy,
} from "lucide-react";
import Image from "next/image";

type Service = {
  title: string;
  tag?: string;
  icon: React.JSX.Element;
  content: React.JSX.Element;
  image: string;
  color: string;
};

const services: Service[] = [
  {
    title: "Sports For All",
    tag: "sports-for-all",
    icon: <School className="w-5 h-5 text-cyan-400" />,
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Integrated sports programs from K3 to K12</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Certified coaches with structured curriculum</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Digital progress tracking & assessments</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Inter-school leagues and seasonal tournaments</span>
        </li>
      </ul>
    ),
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/zgobehvpmmgyepbmbol3",
    color: "cyan",
  },
  {
    title: "Pratigrham Sports Academy",
    tag: "sports-academy",
    icon: <Dumbbell className="w-5 h-5 text-emerald-400" />,
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" />
          <span>High-performance training in multiple disciplines</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" />
          <span>Strength, conditioning & nutrition support</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" />
          <span>Video analysis and personalized progress plans</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" />
          <span>Tournament prep & mental conditioning</span>
        </li>
      </ul>
    ),
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/all%20sports/khf6hkraecesywaxqrjk",
    color: "emerald",
  },
  {
    title: "Sports Infra",
    tag: "sports-infra",
    icon: <Building2 className="w-5 h-5 text-orange-400" />,
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-orange-400 mt-1" />
          <span>Design, build & maintain top-tier sports facilities</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-orange-400 mt-1" />
          <span>Smart lighting, scheduling & booking systems</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-orange-400 mt-1" />
          <span>Eco-friendly materials and rooftop playgrounds</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-orange-400 mt-1" />
          <span>Annual maintenance contracts</span>
        </li>
      </ul>
    ),
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/bkq17obxo9vs18jaethk",
    color: "orange",
  },
  {
    title: "Sports Space",
    tag: "sports-space",
    icon: <MapPin className="w-5 h-5 text-pink-400" />,
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-pink-400 mt-1" />
          <span>Rentable turf grounds and indoor courts</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-pink-400 mt-1" />
          <span>Flexible memberships & pay-per-use options</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-pink-400 mt-1" />
          <span>Kids camps, corporate events, and wellness</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-pink-400 mt-1" />
          <span>Certified trainers & senior citizen programs</span>
        </li>
      </ul>
    ),
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/wwkdqhs4pig5yww8iq2j",
    color: "pink",
  },
  {
    title: "SportsKart",
    tag: "sportskart",
    icon: <ShoppingCart className="w-5 h-5 text-purple-400" />,
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-purple-400 mt-1" />
          <span>Retail & wholesale for sports gear and apparel</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-purple-400 mt-1" />
          <span>Custom uniforms & branded team kits</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-purple-400 mt-1" />
          <span>Event rentals and nationwide delivery</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-purple-400 mt-1" />
          <span>Support for schools, academies & individuals</span>
        </li>
      </ul>
    ),
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/esldfd5vn6esxriidf2o",
    color: "purple",
  },
];

// Simple sticky scroll implementation for desktop
// const StickyScroll = ({ content }: { content: Service[] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const stickyContainer = document.querySelector(".sticky-container");
//       if (!stickyContainer) return;

//       const containerRect = stickyContainer.getBoundingClientRect();
//       const containerTop = containerRect.top + window.scrollY;
//       const relativeScroll = scrollPosition - containerTop;
//       const sectionHeight = window.innerHeight;

//       // Calculate which section should be active
//       const newActiveIndex = Math.floor(relativeScroll / sectionHeight);
//       const clampedIndex = Math.max(
//         0,
//         Math.min(newActiveIndex, content.length - 1)
//       );

//       if (clampedIndex !== activeIndex) {
//         setActiveIndex(clampedIndex);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial call
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [activeIndex, content.length]);

//   return (
//     <div className="relative sticky-container">
//       <div className="flex">
//         {/* Left side - Content */}
//         <div className="w-1/2 pr-8">
//           {content.map((item, index) => (
//             <div key={index} className="h-screen flex items-center">
//               <div className="max-w-md mx-auto">
//                 <div className="flex items-center gap-3 mb-6">
//                   {item.icon}
//                   <h3 className="text-2xl font-semibold text-gray-900">
//                     {item.title}
//                   </h3>
//                 </div>
//                 <div className="text-gray-600 space-y-3">{item.content}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right side - Images */}
//         <div className="w-1/2 pl-8">
//           <div className="sticky top-1/2 transform -translate-y-1/2">
//             <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
//               <img
//                 src={content[activeIndex].image}
//                 className="w-full h-full object-cover"
//                 alt={content[activeIndex].title}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Mobile services section
const MobileServicesSection = ({ services }: { services: Service[] }) => {
  return (
    <div className="lg:hidden px-4 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-full">
              What We Do
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full">
              Our Services & Solutions
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">
          Transforming Ideas,
          <br />
          <span className="text-blue-600 font-normal">
            Delivering Excellence
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Discover our comprehensive range of solutions designed to elevate your
          business and deliver exceptional results.
        </p>
      </div>

      <div className="space-y-8">
        {services.map((service: Service, index: number) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
              <Image
                width={1920}
                height={1080}
                src={service.image}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                alt={service.title}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {service.icon}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>

              <div className="text-gray-600 text-sm sm:text-base space-y-2">
                {service.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tablet version - grid layout
const TabletServicesSection = ({ services }: { services: Service[] }) => {
  return (
    <div className="hidden md:block lg:hidden px-6 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-full">
              What We Do
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full">
              Our Services & Solutions
            </button>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">
          Transforming Ideas,
          <br />
          <span className="text-blue-600 font-normal">
            Delivering Excellence
          </span>
        </h1>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover our comprehensive range of solutions designed to elevate your
          business and deliver exceptional results.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {services.map((service: Service, index: number) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <Image
                width={1920}
                height={1080}
                src={service.image}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                alt={service.title}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>

              <div className="text-gray-600 text-sm space-y-2">
                {service.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full">
      {/* Services Heading Section - Desktop Only */}
      <div className="relative hidden lg:block pt-24 pb-10 bg-white overflow-hidden">
        <div className="text-center mb-16 px-0">
          <div className="flex items-center mt-14 justify-center mb-8">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <button className="px-4 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded-full">
                What We Do
              </button>
              <button className="px-4 py-1 text-sm font-medium text-white bg-black rounded-full">
                Our Services & Solutions
              </button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Transforming Ideas,
            <br />
            <span className="text-blue-600 font-normal">
              Delivering Excellence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of solutions designed to elevate
            your business and deliver exceptional results that exceed
            expectations.
          </p>
        </div>
      </div>

      {/* Sticky Scroll Content - Desktop Only */}
      <div className="w-full hidden lg:block">
        <StickyScroll content={services} />
      </div>

      {/* Tablet Services Section */}
      <TabletServicesSection services={services} />

      {/* Mobile Services Section */}
      <MobileServicesSection services={services} />

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-br mx-4 from-gray-900 to-black shadow-md rounded-3xl p-8 md:p-12 my-8">
        <Trophy className="w-12 h-12 text-red-400 mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
          Ready to Join Our Community?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Become part of the Pratigrham family and start your journey towards
          excellence in sports and life.
        </p>
        <button className="inline-flex items-center bg-gradient-to-r from-white to-gray-300 text-black font-light px-8 py-4 rounded-full hover:from-gray-100 hover:to-white transition-all duration-200 shadow-lg text-lg">
          Get Started Today
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
