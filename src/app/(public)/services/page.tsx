"use client";

import React, { useState } from "react";
import {
  School,
  Dumbbell,
  Building2,
  ShoppingCart,
  MapPin,
  CheckCircle,
  ArrowRight,
  Trophy,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Service = {
  title: string;
  tag?: string;
  icon: React.JSX.Element;
  content: React.JSX.Element;
  image: string;
  color: string;
  link?: React.JSX.Element;
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
    link: <Link href="/services/sports-academy">Learn More</Link>,
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
    link: <Link href="/services/sports-infra">Learn More</Link>,
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
    icon: <MapPin className="w-5 h-5 text-cyan-400" />,
    link: (
      <a
        href="https://sportsspace.in"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2">
        Visit Sportsspace <ExternalLink className="w-4 h-4" />
      </a>
    ),
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Rentable turf grounds and indoor courts</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Flexible memberships & pay-per-use options</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Kids camps, corporate events, and wellness</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 mt-1" />
          <span>Certified trainers & senior citizen programs</span>
        </li>
      </ul>
    ),
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/wwkdqhs4pig5yww8iq2j",
    color: "cyan",
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

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    cyan: "from-cyan-500 to-cyan-600",
    emerald: "from-emerald-500 to-emerald-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    purple: "from-purple-500 to-purple-600",
  };

  const isEven = index % 2 === 0;

  return (
    <div
      className="group relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`relative flex flex-col lg:flex ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
        style={{ borderRadius: "2rem" }}>
        {/* Image Section */}
        <div className="relative lg:w-1/2 h-64 lg:h-80 overflow-hidden">
          <Image
            width={1920}
            height={1080}
            src={service.image}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            alt={service.title}
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Floating Icon */}
          <div className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            {service.icon}
          </div>

          {/* Color Accent */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
              colorClasses[service.color as keyof typeof colorClasses]
            } transform transition-all duration-500 ${
              isHovered ? "h-2" : "h-1"
            }`}
          />
        </div>

        {/* Content Section */}
        <div className="relative lg:w-1/2 p-8 lg:p-12 flex items-center">
          <div className="w-full space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                {service.title}
              </h3>
              <div
                className={`h-1 bg-gradient-to-r ${
                  colorClasses[service.color as keyof typeof colorClasses]
                } rounded-full transform transition-all duration-500 ${
                  isHovered ? "w-24" : "w-16"
                }`}
              />
            </div>

            {/* Features List */}
            <div className="space-y-3">{service.content}</div>

            {/* Call to Action */}
            {service.link && (
              <div className="pt-4">
                <Button
                  className={`bg-gradient-to-r ${
                    colorClasses[service.color as keyof typeof colorClasses]
                  } hover:shadow-lg text-white border-0 rounded-xl px-6 py-3 transform transition-all duration-300 hover:scale-105`}>
                  {service.link}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Simple Decorative Element */}
          <div className="absolute -right-4 -bottom-4 w-20 h-20 pointer-events-none">
            <div
              className={`w-full h-full bg-gradient-to-br ${
                colorClasses[service.color as keyof typeof colorClasses]
              } opacity-10 rounded-full blur-xl transform transition-all duration-700 ${
                isHovered ? "scale-125" : "scale-100"
              }`}
            />
          </div>
        </div>

        {/* Subtle Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            colorClasses[service.color as keyof typeof colorClasses]
          } opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
        />
      </div>
    </div>
  );
};

export default function ModernServicesSection() {
  return (
    <div className="w-full bg-gradient-to-br mt-10 lg:mt-14 from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="relative pt-16 pb-8 bg-white overflow-hidden">
        <div className="text-center mb-16 px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-300">
                What We Do
              </button>
              <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 to-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Our Services & Solutions
              </button>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Transforming Ideas,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-normal">
              Delivering Excellence
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of solutions designed to elevate
            your business and deliver exceptional results that exceed
            expectations.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 lg:space-y-20">
            {services.map((service: Service, index: number) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-4">
        <div className="max-w-6xl mx-auto text-center bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          </div>

          <div className="relative">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              Tell us your needs
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether it&apos;s sports infrastructure development, academy
              enrollment, facility rentals, or equipment orders—connect with our
              expert team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
