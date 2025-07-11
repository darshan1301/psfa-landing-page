import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy List | Pratigrham Sports",
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

export default async function Page() {
  const res = await fetch(
    `${process.env.BASE_URL}/api/public-api/sports-academy`,
    {
      next: { revalidate: 10 },
    }
  );
  const academies = await res.json();

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="max-w-7xl lg:pt-36 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-16">
          Explore Our Sports Academies
        </h1>
      </div>

      {/* Academies List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-16">
          {academies.map((academy: SportsAcademy) => (
            <div
              key={academy.id}
              className="border-b border-gray-200 last:border-b-0 pb-16 last:pb-0">
              {/* Academy Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="mb-4 lg:mb-0">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {academy.name}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2"
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
                    <span className="text-lg font-medium">
                      {academy.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      academy.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {academy.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Content Layout with Images and Text */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                {/* Images Gallery - 2.5/5 width */}
                <div className="lg:col-span-3">
                  {academy.images.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 h-[36rem]">
                      {/* Main Hero Image */}
                      <div className="relative overflow-hidden rounded-lg group h-88">
                        <Image
                          src={academy.images[0]}
                          alt={`${academy.name} - Main Image`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Side Images Row */}
                      {academy.images.length > 1 && (
                        <div className="grid grid-cols-2 gap-4 h-52">
                          {academy.images
                            .slice(1, 3)
                            .map((img: string, idx: number) => (
                              <div
                                key={idx + 1}
                                className="relative overflow-hidden rounded-lg group">
                                <Image
                                  src={img}
                                  alt={`${academy.name} - Image ${idx + 2}`}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                            ))}

                          {/* More Images Indicator */}
                          {academy.images.length > 3 &&
                            academy.images.length === 3 && (
                              <div className="relative overflow-hidden rounded-lg group bg-gray-900 flex items-center justify-center">
                                <div className="text-white text-center">
                                  <span className="text-lg font-bold">
                                    +{academy.images.length - 3}
                                  </span>
                                  <p className="text-xs mt-1">More</p>
                                </div>
                                <Image
                                  src={academy.images[3]}
                                  alt={`${academy.name} - Additional Images`}
                                  fill
                                  className="object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                                />
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Academy Information - 2.5/5 width */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {/* Academy Description */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        About This Academy
                      </h3>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {academy.description}
                      </p>
                    </div>

                    {/* Academy Features */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Facilities & Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-blue-600"
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
                          <span className="text-gray-700">
                            Professional Coaching
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-green-600"
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
                          <span className="text-gray-700">
                            Modern Equipment
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-purple-600"
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
                          <span className="text-gray-700">
                            Flexible Timings
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-orange-600"
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
                          <span className="text-gray-700">All Age Groups</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Quick Overview
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {academy.batches.length}
                          </div>
                          <div className="text-sm text-gray-600">
                            Active Batches
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
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
                          <div className="text-sm text-gray-600">
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
                <div>
                  <details className="group">
                    <summary className="cursor-pointer flex items-center justify-between py-5 px-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 mb-6 border-l-4 border-blue-500">
                      <div className="flex items-center">
                        <svg
                          className="w-6 h-6 mr-3 text-blue-600"
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
                        <span className="text-xl font-semibold text-gray-900">
                          View All Batches ({academy.batches.length})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          Click to expand
                        </span>
                        <svg
                          className="w-6 h-6 text-gray-500 transition-transform duration-200 group-open:rotate-180"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                      {academy.batches.map((batch: Batch) => (
                        <div
                          key={batch.id}
                          className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-900 mb-2">
                                {batch.name}
                              </h4>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {batch.sport}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-5 h-5 mr-3 text-green-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <div>
                                <div className="font-medium">Duration</div>
                                <div className="text-sm">
                                  {new Date(
                                    batch.startDate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(batch.endDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <svg
                                className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <div>
                                <div className="font-medium">Head Coach</div>
                                <div className="text-sm">{batch.headCoach}</div>
                              </div>
                            </div>

                            {batch.startTime && batch.endTime && (
                              <div className="flex items-center text-gray-600">
                                <svg
                                  className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <div>
                                  <div className="font-medium">
                                    Training Hours
                                  </div>
                                  <div className="text-sm">
                                    {batch.startTime} - {batch.endTime}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {batch.description && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {batch.description}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
