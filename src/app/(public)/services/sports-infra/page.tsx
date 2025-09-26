import React from "react";
import { Metadata } from "next";
import { ImageGallery } from "@/components/ImageGallery";
import { GET } from "@/app/api/public-api/sports-infra/route";
import { ArrowRight, DraftingCompass } from "lucide-react";
import Link from "next/link";
import InfraPage from "@/components/InfraPage";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sports Infrastructure | Pratigrham Sports For All",
  description:
    "Discover world-class sports facilities designed for excellence and performance",
};

interface SportsInfrastructure {
  id: string;
  name: string;
  location: string;
  description: string;
  Area?: number;
  images: string[];
  createdAt: string;
  Amenities: string[];
}

export const revalidate = 60; // cache for 60 seconds (ISR)

export default async function Page() {
  // Fetch data from your API
  const res = await GET();
  const infrastructures: SportsInfrastructure[] = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Top padding for overlay navbar */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className=" mt-6 md:mt-10 flex justify-center">
            <Image
              alt="Pratigrham Sports Space Logo"
              width={200}
              height={200}
              src={
                "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758277716/psfa-landing-page/logo/sports_infra_wppewq.png"
              }
            />
          </div>
          <div className="text-center mb-12 lg:pt-8 pt-4">
            <h1 className="text-4xl sm:text-5xl tracking-tight text-blue-600 mb-4">
              Sports Infrastructure
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover world-class sports facilities designed for excellence and
              performance
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <InfraPage />

          {/* Infrastructure Grid */}
          <div className="md:space-y-16">
            <section className="text-center max-w-4xl mx-auto  sm:px-10 py-8 md:py-16">
              <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-4">
                Our Previous &{" "}
                <span className="font-medium text-blue-600">
                  Ongoing Infrastructure Work
                </span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                A look at the world-class sports facilities we’ve already built
                and the projects currently in progress — from multi-sport turfs
                and cricket nets to full-scale academies.
              </p>
            </section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {infrastructures.map((infrastructure) => (
                <InfrastructureCard
                  key={infrastructure.id}
                  infrastructure={infrastructure}
                />
              ))}
            </div>
          </div>

          {/* Empty State */}
          {infrastructures.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Infrastructure Found
                </h3>
                <p className="text-gray-600">
                  Check back later for new sports facilities.
                </p>
              </div>
            </div>
          )}
          <div className="text-center bg-gradient-to-br mt-10 from-gray-900 to-black shadow-md rounded-3xl p-8 md:p-12 mx-4 lg:mx-0">
            <DraftingCompass className="w-12 h-12 text-red-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
              Get 3d Models of your 2d infra layouts
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Visit our Contact page to connect with our team and kick things
              off.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center bg-gradient-to-r from-white to-gray-300 text-black font-light px-8 py-4 rounded-full hover:from-gray-100 hover:to-white transition-all duration-200 shadow-lg text-lg">
                Get a 3D view
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfrastructureCard = ({
  infrastructure,
}: {
  infrastructure: SportsInfrastructure;
}) => (
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] h-full">
    {/* Image Section - Full width on top */}
    <div className="w-full p-4">
      <ImageGallery
        images={infrastructure.images}
        responsiveHeights="h-56 sm:h-64 md:h-[30rem]"
        aspectRatio="aspect-w-16 aspect-h-10"
      />
    </div>

    {/* Content Section - Below images */}
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium uppercase text-base">
            {infrastructure.location}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {infrastructure.Area && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200">
            <div className="text-lg font-bold text-blue-600">
              {infrastructure.Area.toLocaleString()}
            </div>
            <div className="text-xs text-blue-700 font-medium">Sq Feet</div>
          </div>
        )}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center border border-green-200">
          <div className="text-lg font-bold text-green-600">
            {infrastructure.Amenities.length}
          </div>
          <div className="text-xs text-green-700 font-medium">Amenities</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200">
          <div className="text-lg font-bold text-purple-600">
            {infrastructure.images.length}
          </div>
          <div className="text-xs text-purple-700 font-medium">Photos</div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Key Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {infrastructure.Amenities.map((amenity, amenityIndex) => (
            <span
              key={amenityIndex}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-300 cursor-default border border-blue-200">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);
