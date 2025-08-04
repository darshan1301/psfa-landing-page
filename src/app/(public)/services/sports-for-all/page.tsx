import React from "react";

export default function SportsForAllPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
      {/* Hero Section */}
      <div className="text-center mx-6 sm:mx-10 mb-16 px-0 pt-40">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
          Sports For All
          <br />
          <span className="text-blue-600 font-normal">Building Champions</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Empowering every age group with world-class sports training, fitness
          coaching, and wellness programs. From little champions to experienced
          adults, we have something for everyone.
        </p>
      </div>

      {/* Age Groups Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Programs by Age Group
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Toddlers (3-6 yrs)",
              "Kids (7-12 yrs)",
              "Teens (13-18 yrs)",
              "Adults & Seniors",
            ].map((group) => (
              <div
                key={group}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-2 text-blue-600">
                  {group}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {group.includes("Toddlers")
                    ? "Fun movement, coordination games, and introduction to team play."
                    : group.includes("Kids")
                    ? "Skill drills, mini-competitions, foundational training in football, cricket, and more."
                    : group.includes("Teens")
                    ? "Intensive coaching, tactical sessions, strength & agility modules for aspiring athletes."
                    : "Group fitness, health-focused routines, low-impact sports & wellness workshops."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Why Choose Pratigrham Sports For All?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span>
                Certified coaches with years of professional experience.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span>
                Modern outdoor & indoor facilities with premium equipment.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span>
                Customized training plans tailored to all fitness levels.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">✓</span>
              <span>
                Dedicated focus on safety, wellness, and injury prevention.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
