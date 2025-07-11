"use client";
import Image from "next/image";
import React from "react";

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
// Client Component for Image Gallery
export function ImageGallery({
  infrastructure,
}: {
  infrastructure: SportsInfrastructure;
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={infrastructure.images[selectedIndex]}
          alt={infrastructure.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Image Thumbnails */}
      {infrastructure.images.length > 1 && (
        <div className="flex gap-3 mt-4 justify-center">
          {infrastructure.images.map((image, imgIndex) => (
            <button
              key={imgIndex}
              onClick={() => setSelectedIndex(imgIndex)}
              className={`relative h-16 w-16 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedIndex === imgIndex
                  ? "ring-4 ring-blue-500 ring-offset-2 scale-110"
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              }`}>
              <Image
                src={image}
                alt={`${infrastructure.name} - View ${imgIndex + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
