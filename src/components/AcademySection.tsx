"use client";

import React, { useState, useEffect } from "react";
import { AcademyCard } from "./AcademyCard";
import { Loader2 } from "lucide-react";

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

export function AcademiesSection() {
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcademies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/public-api/sports-academy`);

        if (!response.ok) {
          throw new Error(`Failed to fetch academies: ${response.statusText}`);
        }

        const data = await response.json();
        setAcademies(data);
      } catch (err) {
        console.error("Error fetching academies:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load academies"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAcademies();
  }, []);

  // Show loader while fetching
  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 text-base sm:text-lg">
            Loading academies...
          </p>
        </div>
      </section>
    );
  }

  // Show error state (optional - can be removed if you prefer silent failure)
  if (error) {
    return null; // Silent fail - don't show component on error
  }

  // Filter only active academies
  const activeAcademies = academies.filter((academy) => academy.isActive);

  // Don't render component if no active academies
  if (activeAcademies.length === 0) {
    return null;
  }

  return (
    <section id="academies" className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
          Our <span className="font-medium text-blue-600">Academies</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Choose from our multiple training locations across Nagpur. Each
          academy offers world-class facilities and expert coaching.
        </p>
      </div>

      {/* Academies Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
        {activeAcademies.map((academy) => (
          <AcademyCard key={academy.id} academy={academy} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-gray-700 text-base sm:text-lg mb-6">
          Can&apos;t find the right batch for you?
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-base sm:text-lg font-semibold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105">
          Contact Us for Custom Programs
        </a>
      </div>
    </section>
  );
}
