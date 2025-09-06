// app/astp/page.tsx
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  ClipboardCheck,
  Trophy,
  Activity,
  Lightbulb,
  FileText,
  Wrench,
  BarChart3,
  Layers,
  Camera,
  Monitor,
  Settings,
  HeartPulse,
} from "lucide-react";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Annual Sports Training Program for Schools & Colleges | PSFA ASTP",
  description:
    "ASTP brings weekly coaching, assessments, events and live dashboards to your campus. Measurable outcomes, standardized SOPs and safety.",
  keywords: [
    "school sports program",
    "annual sports training",
    "institutional sports partner",
    "sports coaching for schools",
  ],
};

export default async function ASTPPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="text-center mx-6 sm:mx-10 px-0 pt-32 pb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
          Year-Round Sports Education
          <br />
          <span className="text-blue-600 font-medium">That Scales.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
          Weekly training + assessments + tournaments with dashboards — built
          for schools & colleges.
        </p>
        <Link href="/contact">
          <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105 text-lg">
            Book a Campus Demo
          </button>
        </Link>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 space-y-20">
        {/* Program Design */}
        <Section
          variant="gradient"
          title="Program Design"
          items={[
            {
              title: "Custom Sports Mix",
              desc: "1–3 sports per institute, customizable to your needs.",
              icon: Layers,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Weekly Skill Sessions",
              desc: "Integrated into the timetable for consistency.",
              icon: Activity,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Holistic Add-ons",
              desc: "Fitness, nutrition, and life-skills modules.",
              icon: HeartPulse,
              color: "from-pink-500 to-rose-500",
            },
            {
              title: "Assessments",
              desc: "Quarterly certifications with skill benchmarks.",
              icon: ClipboardCheck,
              color: "from-purple-500 to-violet-600",
            },
            {
              title: "Tournaments",
              desc: "Inter-house and inter-school competition calendars.",
              icon: Trophy,
              color: "from-orange-500 to-amber-600",
            },
          ]}
        />

        {/* Tech Enablement */}
        <Section
          title="Tech Enablement (Optional)"
          items={[
            {
              title: "Fitness Trackers",
              desc: "Attendance & activity logging integrated with dashboards.",
              icon: Users,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "AI Camera",
              desc: "Smart session recording & analytics.",
              icon: Camera,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Live Streaming",
              desc: "Broadcast intra-school tournaments in real-time.",
              icon: Monitor,
              color: "from-purple-500 to-pink-600",
            },
            {
              title: "Dashboards",
              desc: "Principals & parents can view progress & leaderboards.",
              icon: BarChart3,
              color: "from-orange-500 to-amber-600",
            },
          ]}
        />

        {/* Implementation Process */}
        <Section
          title="Implementation Process"
          items={[
            {
              title: "Discovery & Audit",
              desc: "Ground, equipment & timetable survey.",
              icon: FileText,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Proposal",
              desc: "Sports mix, batch matrix, pricing, SLAs.",
              icon: Lightbulb,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Onboarding",
              desc: "Coach deployment, kits, safety SOPs.",
              icon: Users,
              color: "from-orange-500 to-amber-600",
            },
            {
              title: "Delivery",
              desc: "Weekly sessions and assessments.",
              icon: Wrench,
              color: "from-purple-500 to-violet-600",
            },
            {
              title: "Events",
              desc: "Quarterly tournaments & showcases.",
              icon: Trophy,
              color: "from-pink-500 to-rose-500",
            },
            {
              title: "Reporting",
              desc: "Dashboards, reports & stakeholder feedback.",
              icon: BarChart3,
              color: "from-red-500 to-rose-600",
            },
          ]}
        />

        {/* Pricing Models */}
        <Section
          variant="gradient"
          title="Pricing Models"
          items={[
            {
              title: "Per Student",
              desc: "Per-student per month (PSPM) billing.",
              icon: Users,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Fixed Retainer",
              desc: "Monthly retainer based on program size.",
              icon: Settings,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "CSR-Funded",
              desc: "Blended models supported by CSR initiatives.",
              icon: HeartPulse,
              color: "from-orange-500 to-amber-600",
            },
          ]}
        />

        {/* Outcomes & KPIs */}
        {/* <Section
          title="Outcomes & KPIs"
          items={[
            {
              title: "Participation",
              desc: "Attendance %, engagement & retention.",
              icon: Users,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Fitness Gains",
              desc: "Improvement vs baseline benchmarks.",
              icon: Activity,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Skill Attainment",
              desc: "Progress by sport & grade levels.",
              icon: ClipboardCheck,
              color: "from-orange-500 to-amber-600",
            },
            {
              title: "Tournaments",
              desc: "Participation rates & medals won.",
              icon: Trophy,
              color: "from-purple-500 to-violet-600",
            },
            {
              title: "Satisfaction",
              desc: "Parent & admin feedback scores.",
              icon: BarChart3,
              color: "from-pink-500 to-rose-500",
            },
          ]}
        /> */}
      </div>
    </div>
  );
}
