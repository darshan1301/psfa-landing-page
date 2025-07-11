import React from "react";
import { Metadata } from "next";
import { ImageGallery } from "@/components/ImageGallery";
import { GET } from "@/app/api/public-api/sports-infra/route";

export const metadata: Metadata = {
  title: "Sports Infrastructure | Pratigrham Sports",
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
          <div className="text-center mb-16 lg:pt-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Sports Infrastructure
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover world-class sports facilities designed for excellence and
              performance
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Infrastructure Grid */}
          <div className="space-y-16">
            {infrastructures.map((infrastructure, index) => (
              <div
                key={infrastructure.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                <div
                  className={`${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex flex-col lg:flex`}>
                  {/* Image Section */}
                  <div className="lg:w-1/2 w-full p-2 lg:p-8">
                    <ImageGallery infrastructure={infrastructure} />
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 w-full p-8 lg:p-12 flex flex-col justify-between">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-blue-600">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium text-base">
                            {infrastructure.location}
                          </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                          {infrastructure.name}
                        </h2>
                      </div>

                      {/* Description */}
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 leading-relaxed text-base">
                          {infrastructure.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {infrastructure.Area && (
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">
                              {infrastructure.Area.toLocaleString()}
                            </div>
                            <div className="text-sm text-blue-700 font-medium">
                              Sq Feet
                            </div>
                          </div>
                        )}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
                          <div className="text-2xl font-bold text-green-600">
                            {infrastructure.Amenities.length}
                          </div>
                          <div className="text-sm text-green-700 font-medium">
                            Amenities
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
                          <div className="text-2xl font-bold text-purple-600">
                            {infrastructure.images.length}
                          </div>
                          <div className="text-sm text-purple-700 font-medium">
                            Photos
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Key Amenities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {infrastructure.Amenities.map(
                            (amenity, amenityIndex) => (
                              <span
                                key={amenityIndex}
                                className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-300 cursor-default border border-blue-200">
                                {amenity}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        </div>
      </div>
    </div>
  );
}
