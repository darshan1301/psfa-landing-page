// components/WhyPsfaSection.tsx
import { Layers, BarChart4, ShieldCheck, Globe2, Scale } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Integrated 5-Vertical Model",
    description:
      "End-to-end solutions across sports, fitness, infrastructure, retail & events.",
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    icon: BarChart4,
    title: "Data-driven Programs",
    description:
      "Measurable outcomes with analytics, dashboards, and performance tracking.",
    gradient: "from-sky-400 to-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Standardized SOPs",
    description:
      "Built-in safety protocols and quality assurance at every stage.",
    gradient: "from-indigo-400 to-indigo-600",
  },
  {
    icon: Globe2,
    title: "Local + Enterprise Planning",
    description:
      "Ground-level execution blended with enterprise-grade strategy.",
    gradient: "from-orange-400 to-orange-600",
  },
  {
    icon: Scale,
    title: "Transparent Pricing & ROI",
    description:
      "Clear, fair pricing models designed for institutions & communities.",
    gradient: "from-pink-400 to-pink-600",
  },
];

export default function WhyPsfaSection() {
  return (
    <section className="relative w-full  py-10 px-6 md:px-12 lg:px-22">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
          Why <span className="text-blue-600 font-normal">PSFA?</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Building India’s most loved sports ecosystem — coaching, programs,
          venues, retail, and infrastructure under one roof.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-xl p-8 transition-all duration-300">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${item.gradient} shadow-lg mb-6`}>
              <item.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
