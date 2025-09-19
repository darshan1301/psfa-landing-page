import React from "react";

export default function Astpvid({ heading }: { heading?: string }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {heading && (
        <h2 className="text-3xl sm:text-4xl font-light text-center mb-10 text-gray-900 dark:text-white">
          {heading}
        </h2>
      )}
      <div className="grid items-center justify-center grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video 1 */}
        <div className="relative w-full aspect-video flex justify-center">
          <iframe
            className="w-full md:w-[500px] md:h-[320px] rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/63NTi3UhiJk?si=STVmuwzi0wqPxQq2"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>

        {/* Video 2 */}
        <div className="relative w-full aspect-video flex justify-center">
          <iframe
            className="w-full md:w-[500px] md:h-[320px] rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/5vxOMKDqkF0?si=gjb3elEoz8lZ1HZ5"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      </div>
    </section>
  );
}
