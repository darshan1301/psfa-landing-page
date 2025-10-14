import React from "react";
import { School, Building2, MapPin, Trophy, ShoppingBag } from "lucide-react";
import Link from "next/link";

export const services = [
  {
    icon: School,
    title: "Annual Sports Training Program",
    description:
      "Sports training programs for schools with structured curriculum, fitness assessments, multi-sport exposure, tournaments, and competitions.",
    gradient: "from-emerald-400 to-emerald-600",
    link: "/sports-for-all",
  },
  {
    icon: Building2,
    title: "Sports Infrastructure",
    description:
      "End-to-end design, development, and management of world-class turfs, courts, and fitness facilities with a focus on safety and durability.",
    gradient: "from-indigo-400 to-indigo-600",
    link: "/sports-infra",
  },
  {
    icon: MapPin,
    title: "Sports Space",
    description:
      "Discover and book PSFA-managed turfs, courts, and arenas across the city — or let us operate your venue end-to-end.",
    gradient: "from-sky-400 to-sky-600",
    link: "/sportsspace",
  },
  {
    icon: Trophy,
    title: "Multi Sports Academy",
    description:
      "Structured coaching in Football, Cricket, Pickleball, and more — covering fundamentals to match performance with expert coaches.",
    gradient: "from-orange-400 to-orange-600",
    link: "/sports-academy",
  },
  {
    icon: ShoppingBag,
    title: "Sportskart",
    description:
      "Indoor/outdoor sports gear, fitness apparel, nutrition products, customized team uniforms, and expert equipment consultation with ongoing maintenance support.",
    gradient: "from-pink-400 to-pink-600",
    link: "/sportskart",
  },
];

const ServicesCards: React.FC = () => {
  return (
    <section id="verticals" className="py-10 px-6 md:px-0">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Our Sports{" "}
            <span className="font-medium text-blue-600">Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Comprehensive solutions for sports development, infrastructure, and
            management across all levels
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => (
            <Link
              key={idx}
              href={`/services/${service.link}`}
              className="group relative block cursor-pointer">
              {/* Background Accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300 opacity-40`}></div>

              {/* Main Card */}
              <div className="relative h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform group-hover:-translate-y-2">
                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${service.gradient} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-10 h-10" />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA Button */}
                <button
                  className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 px-6 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 group-hover:shadow-xl`}>
                  Learn More
                </button>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${service.gradient} rounded-t-full`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 sm:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white bg-opacity-10 transform translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white bg-opacity-5 transform -translate-x-32 translate-y-32"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-light mb-6">
                Ready to Transform Your
                <span className="block font-medium">Sports Program?</span>
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-3xl mx-auto">
                Contact us to discuss how our comprehensive sports services can
                help you achieve your goals and create lasting impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <button className="flex-1 bg-white text-blue-600 py-4 px-8 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Consultation
                </button>
                <button className="flex-1 border-2 border-blue-200 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:border-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ServicesCards;
