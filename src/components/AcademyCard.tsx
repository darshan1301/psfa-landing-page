"use client";

import React from "react";
import { ImageGallery } from "./ImageGallery";
import { MapPin, Clock, Users } from "lucide-react";

interface Batch {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  sport: string;
  headCoach: string;
  description: string;
  startTime: string;
  endTime: string;
  sportsAcademyId: string;
}

interface Academy {
  id: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  createdAt: string;
  isActive: boolean;
  batches: Batch[];
}

interface AcademyCardProps {
  academy: Academy;
}

export function AcademyCard({ academy }: AcademyCardProps) {
  const [showAllBatches, setShowAllBatches] = React.useState(false);
  const displayedBatches = showAllBatches
    ? academy.batches
    : academy.batches.slice(0, 3);

  // Group batches by sport
  const batchesBySport = academy.batches.reduce((acc, batch) => {
    if (!acc[batch.sport]) {
      acc[batch.sport] = [];
    }
    acc[batch.sport].push(batch);
    return acc;
  }, {} as Record<string, Batch[]>);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     month: "short",
  //     year: "numeric",
  //   });
  // };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image Gallery */}
      <div className="p-6 pb-4">
        <ImageGallery
          images={academy.images}
          altPrefix={academy.name}
          responsiveHeights="h-64 sm:h-72 md:h-80 lg:h-96"
          rounded="rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Academy Name & Location */}
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-3 tracking-tight">
            {academy.name}
          </h3>
          <div className="flex items-start gap-2 text-gray-600 mb-3">
            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
            <p className="text-sm sm:text-base">{academy.location}</p>
          </div>
          {/* <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {academy.description}
          </p> */}
        </div>

        {/* Sports Summary */}
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.keys(batchesBySport).map((sport) => (
            <span
              key={sport}
              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs sm:text-sm font-medium rounded-full border border-blue-100">
              {sport} ({batchesBySport[sport].length}{" "}
              {batchesBySport[sport].length === 1 ? "batch" : "batches"})
            </span>
          ))}
        </div>

        {/* Batches */}
        <div className="space-y-4">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
            Available Batches
          </h4>

          <div className="space-y-3">
            {displayedBatches.map((batch) => (
              <div
                key={batch.id}
                className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                {/* Batch Header */}
                <div className="flex items-start justify-between mb-3">
                  <h5 className="text-base sm:text-lg font-medium text-gray-900">
                    {batch.name}
                  </h5>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {batch.sport}
                  </span>
                </div>

                {/* Batch Details */}
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>
                      {formatTime(batch.startTime)} -{" "}
                      {formatTime(batch.endTime)}
                    </span>
                  </div>

                  {/* <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>
                      {formatDate(batch.startDate)} -{" "}
                      {formatDate(batch.endDate)}
                    </span>
                  </div> */}

                  <div className="flex items-center gap-2 text-gray-700 sm:col-span-2">
                    <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Coach: {batch.headCoach}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {academy.batches.length > 3 && (
            <button
              onClick={() => setShowAllBatches(!showAllBatches)}
              className="w-full mt-4 px-4 py-2.5 bg-white border-2 border-blue-600 text-blue-600 text-sm sm:text-base font-medium rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105">
              {showAllBatches
                ? "Show Less"
                : `Show ${academy.batches.length - 3} More ${
                    academy.batches.length - 3 === 1 ? "Batch" : "Batches"
                  }`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
