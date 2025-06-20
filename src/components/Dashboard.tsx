"use client";

import { useState } from "react";
import {
  Users,
  Mail,
  Briefcase,
  Star,
  Trophy,
  Settings,
  UserCheck,
  Map,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import LeadsTab from "./Dashboard/LeadsTab";
import NewsletterTab from "./Dashboard/SubscribersTab";
import JobsTab from "./Dashboard/JobsTab";
import SportsTab from "./Dashboard/SportsTab";
import ServicesTab from "./Dashboard/ServiceTab";
import { TeamTab } from "./Dashboard/TeamTab";
import JourneyTab from "./Dashboard/JourneyTab";
import TestimonialsTab from "./Dashboard/TestimonialsTab";

type Tab =
  | "leads"
  | "newsletter"
  | "jobs"
  | "testimonials"
  | "sports"
  | "services"
  | "team"
  | "journey";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get tab from URL or default to "leads"
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const tabFromUrl = searchParams.get("tab") as Tab;
    return tabFromUrl &&
      [
        "leads",
        "newsletter",
        "jobs",
        "testimonials",
        "sports",
        "services",
        "team",
        "journey",
      ].includes(tabFromUrl)
      ? tabFromUrl
      : "leads";
  });

  // Update URL when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const tabConfig = [
    {
      id: "leads",
      label: "Leads Enquiry",
      icon: Users,
      color: "bg-slate-800", // Neutral & serious
    },
    {
      id: "newsletter",
      label: "Subscribers",
      icon: Mail,
      color: "bg-zinc-700", // Muted professional gray
    },
    {
      id: "jobs",
      label: "Job Applications",
      icon: Briefcase,
      color: "bg-indigo-800", // Modern corporate blue
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: Star,
      color: "bg-stone-600", // Warm neutral stone tone
    },
    {
      id: "sports",
      label: "Sports",
      icon: Trophy,
      color: "bg-gray-700", // Mature neutral gray
    },
    {
      id: "services",
      label: "Services",
      icon: Settings,
      color: "bg-cyan-800", // Tech-focused & clean
    },
    {
      id: "team",
      label: "Team Members",
      icon: UserCheck,
      color: "bg-neutral-700", // Clean and quiet
    },
    {
      id: "journey",
      label: "Journey Cards",
      icon: Map,
      color: "bg-blue-900", // Deep modern blue
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "leads":
        return <LeadsTab />;
      case "newsletter":
        return <NewsletterTab />;
      case "jobs":
        return <JobsTab />;
      case "testimonials":
        return <TestimonialsTab />;
      case "sports":
        return <SportsTab />;
      case "services":
        return <ServicesTab />;
      case "team":
        return <TeamTab />;
      case "journey":
        return <JourneyTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-200">
        <div className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 mb-4 rounded-xl flex items-center justify-center overflow-hidden">
              <Image
                height={1080}
                width={1080}
                src="https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/pgm/k4dnorpbvdkhrhkfssfl"
                alt="pratigrham sports for all logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                CMS Dashboard
              </h1>
              <p className="text-sm text-gray-500">Content Management</p>
            </div>
          </div>

          <nav className="space-y-2">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as Tab)}
                  className={`group flex items-center w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? `${tab.color} text-white shadow-lg transform scale-105`
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}>
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{tab.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
