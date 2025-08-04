import React from "react";
import { Metadata } from "next";
import { GET } from "@/app/api/public-api/sports-academy/route";
import { ImageGallery } from "@/components/ImageGallery";
import BatchCard from "@/components/BatchCard";

export const metadata: Metadata = {
  title: "Sports Infrastructure | Pratigrham Sports",
  description:
    "Discover world-class sports facilities designed for excellence and performance",
};

export async function generateStaticParams() {
  return [];
}

interface Batch {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  sport: string;
  headCoach: string;
  description?: string;
  startTime: string;
  endTime: string;
}

interface SportsAcademy {
  id: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  isActive: boolean;
  batches: Batch[];
}
export const revalidate = 60;

export default async function Page() {
  const res = await GET();
  const academies = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="text-center mx-6 sm:mx-10 mb-16 px-0 pt-40">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
          Building Champions,
          <br />
          <span className="text-blue-600 font-normal">Creating Futures</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At Pratigrham Sports Academy, we believe in nurturing talent, building
          character, and creating champions both on and off the field.
        </p>
      </div>

      {/* Academies List */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="space-y-8 sm:space-y-12 lg:space-y-20">
          {academies.map((academy: SportsAcademy) => (
            <div
              key={academy.id}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
              {/* Academy Header - Simplified without blue background */}
              <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2 sm:mb-3">
                      {academy.name}
                    </h2>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm sm:text-base lg:text-lg">
                        {academy.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-start sm:justify-end">
                    <span
                      className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                        academy.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {academy.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Layout with Images and Text */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8">
                  {/* Images Gallery - 3/5 width */}
                  <div className="lg:col-span-3">
                    <ImageGallery
                      altPrefix={academy.batches[0].sport}
                      images={academy.images}
                      responsiveHeights="h-64 sm:h-80 md:h-96 lg:h-[500px]"
                      aspectRatio="aspect-w-10 aspect-h-9"
                    />
                  </div>

                  {/* Academy Information - 2/5 width */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6 sm:space-y-8">
                      {/* Academy Description */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 sm:mb-4">
                          About This Academy
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {academy.description}
                        </p>
                      </div>

                      {/* Academy Features */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 sm:mb-4">
                          Facilities & Features
                        </h3>
                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                          <div className="flex items-center space-x-3 sm:space-x-4 p-2.5 sm:p-3 bg-blue-50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              Professional Coaching
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 sm:space-x-4 p-2.5 sm:p-3 bg-green-50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              Modern Equipment
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 sm:space-x-4 p-2.5 sm:p-3 bg-purple-50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              Flexible Timings
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 sm:space-x-4 p-2.5 sm:p-3 bg-orange-50 rounded-xl">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                              Age Group: 3-20 years
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
                        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">
                          Quick Overview
                        </h3>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                          <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                              {academy.batches.length}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium">
                              Active Batches
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                              {academy.batches.reduce(
                                (acc: number, batch: Batch) => {
                                  const sports = batch.sport
                                    ? batch.sport.split(",").length
                                    : 0;
                                  return acc + sports;
                                },
                                0
                              ) || "Multiple"}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium">
                              Sports Offered
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Batches Section */}
                {academy.batches.length > 0 && (
                  <div className="mt-8 sm:mt-12">
                    <details className="group">
                      <summary className="cursor-pointer flex items-center justify-between py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 mb-4 sm:mb-6 border-l-4 border-blue-500 shadow-sm">
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="text-lg sm:text-xl font-bold text-gray-900">
                              View All Batches
                            </span>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              {academy.batches.length} batches available
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">
                            Click to expand
                          </span>
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 transition-transform duration-300 group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </summary>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                        {academy.batches.map((batch: Batch) => (
                          <BatchCard key={batch.id} batch={batch} />
                        ))}
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
