import React from "react";

interface Batch {
  id: string;
  name: string;
  sport: string;
  startDate: string;
  endDate: string;
  headCoach: string;
  startTime?: string;
  endTime?: string;
  description?: string;
}

// Format a 24-hour time string to 12-hour format (e.g. "13:30" → "1:30 PM")
const formatTime12 = (time: string) =>
  new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export default function BatchCard({ batch }: { batch: Batch }) {
  return (
    <article
      key={batch.id}
      className="group relative bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200/80 rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10"></div>

      {/* Header */}
      <header className="relative mb-7">
        <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-orange-600/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-2 tracking-wide">
                {batch.name}
              </h4>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20">
                {batch.sport}
              </span>
            </div>

            {/* Sport icon based on sport type */}
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <svg
                className="w-6 h-6 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Details Grid */}
      <dl className="relative grid gap-6">
        {/* Start Date */}
        <div className="flex items-center group/item">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <dt className="text-sm font-semibold text-gray-800 mb-1">
              Start Date
            </dt>
            <dd className="text-base text-gray-700 font-medium">
              <time dateTime={batch.startDate}>
                {new Date(batch.startDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </dd>
          </div>
        </div>

        {/* Head Coach */}
        <div className="flex items-center group/item">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-purple-600"
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
          </div>
          <div className="flex-1">
            <dt className="text-sm font-semibold text-gray-800 mb-1">
              Head Coach
            </dt>
            <dd className="text-base text-gray-700 font-medium">
              {batch.headCoach}
            </dd>
          </div>
        </div>

        {/* Training Hours */}
        {batch.startTime && batch.endTime && (
          <div className="flex items-center group/item">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v9l4 4"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <div className="flex-1">
              <dt className="text-sm font-semibold text-gray-800 mb-1">
                Training Hours
              </dt>
              <dd className="text-base text-gray-700 font-medium flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200">
                  {formatTime12(batch.startTime)}
                </span>
                <span className="text-gray-400">→</span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200">
                  {formatTime12(batch.endTime)}
                </span>
              </dd>
            </div>
          </div>
        )}
      </dl>

      {/* Description */}
      {batch.description && (
        <div className="relative mt-8 pt-6 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
            {batch.description}
          </p>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
    </article>
  );
}
