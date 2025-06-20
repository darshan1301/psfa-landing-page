import React from "react";

interface PageLoaderProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export default function PageLoader({
  message = "Loading...",
  size = "medium",
}: PageLoaderProps) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        {/* Simple gradient spinner */}
        <div
          className={`${sizeClasses[size]} mx-auto mb-4 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>

        {/* Loading message */}
        <p className="text-gray-600 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
