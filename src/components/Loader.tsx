import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "bars" | "ring";
  color?: "blue" | "gray" | "green" | "red" | "purple" | "indigo";
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "md",
  variant = "spinner",
  color = "blue",
  fullScreen = false,
  overlay = false,
  className = "",
}) => {
  const sizeConfig = {
    sm: { spinner: "w-4 h-4", text: "text-sm", spacing: "space-y-2" },
    md: { spinner: "w-6 h-6", text: "text-base", spacing: "space-y-3" },
    lg: { spinner: "w-8 h-8", text: "text-lg", spacing: "space-y-4" },
    xl: { spinner: "w-12 h-12", text: "text-xl", spacing: "space-y-5" },
  };

  const colorConfig = {
    blue: "border-blue-600 text-blue-600",
    gray: "border-gray-600 text-gray-600",
    green: "border-green-600 text-green-600",
    red: "border-red-600 text-red-600",
    purple: "border-purple-600 text-purple-600",
    indigo: "border-indigo-600 text-indigo-600",
  };

  const Spinner = () => (
    <div
      className={`${sizeConfig[size].spinner} border-4 ${colorConfig[color]} border-t-transparent rounded-full animate-spin`}
    />
  );

  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-full ${
            size === "sm"
              ? "w-2 h-2"
              : size === "md"
              ? "w-3 h-3"
              : size === "lg"
              ? "w-4 h-4"
              : "w-5 h-5"
          } bg-${color}-600 animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeConfig[size].spinner} bg-${color}-600 rounded-full animate-pulse`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );

  const Bars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`bg-${color}-600 animate-pulse ${
            size === "sm"
              ? "w-1"
              : size === "md"
              ? "w-1.5"
              : size === "lg"
              ? "w-2"
              : "w-3"
          }`}
          style={{
            height: `${12 + (i % 3) * 8}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );

  const Ring = () => (
    <div className="relative">
      <div
        className={`${sizeConfig[size].spinner} border-4 border-gray-200 rounded-full`}
      />
      <div
        className={`absolute top-0 left-0 ${sizeConfig[size].spinner} border-4 ${colorConfig[color]} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );

  const getLoader = () => {
    switch (variant) {
      case "dots":
        return <Dots />;
      case "pulse":
        return <Pulse />;
      case "bars":
        return <Bars />;
      case "ring":
        return <Ring />;
      default:
        return <Spinner />;
    }
  };

  const LoadingContent = () => (
    <div
      className={`flex flex-col items-center justify-center ${sizeConfig[size].spacing} ${className}`}>
      {getLoader()}
      {message && (
        <p
          className={`${sizeConfig[size].text} ${colorConfig[color]} font-medium animate-pulse`}>
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <LoadingContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-40">
        <LoadingContent />
      </div>
    );
  }

  return <LoadingContent />;
};

export default Loading;
