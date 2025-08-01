"use client";

import React from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  altPrefix?: string;
  responsiveHeights?: string; // tailwind classes like 'h-64 sm:h-80 lg:h-[500px]'
  aspectRatio?: string; // e.g., "aspect-w-10 aspect-h-9"
  rounded?: string; // tailwind border radius classes
  showThumbnails?: boolean;
  className?: string;
}

export function ImageGallery({
  images,
  altPrefix = "Image",
  responsiveHeights = "h-64 sm:h-80 md:h-96 lg:h-[500px]",
  aspectRatio = "",
  rounded = "rounded-2xl",
  showThumbnails = true,
  className = "",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className={`w-full bg-gray-100 text-gray-400 text-center flex items-center justify-center ${rounded} ${responsiveHeights}`}>
        No images available
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Main Image */}
      <div
        className={`relative w-full overflow-hidden shadow-2xl ${rounded} ${responsiveHeights} ${aspectRatio}`}>
        <Image
          src={images[selectedIndex]}
          alt={`${altPrefix} ${selectedIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && showThumbnails && (
        <div className="flex gap-3 mt-4 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-16 w-16 overflow-hidden transition-all duration-300 ${rounded} ${
                selectedIndex === index
                  ? "ring-4 ring-blue-500 ring-offset-2 scale-110"
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              }`}>
              <Image
                src={img}
                alt={`${altPrefix} ${index + 1}`}
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
