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
  Building,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import LeadsTab from "./DashboardPage/LeadsTab";
import NewsletterTab from "./DashboardPage/SubscribersTab";
import JobsTab from "./DashboardPage/JobsTab";
import SportsTab from "./DashboardPage/SportsTab";
import ServicesTab from "./DashboardPage/ServiceTab";
import { TeamTab } from "./DashboardPage/TeamTab";
import JourneyTab from "./DashboardPage/JourneyTab";
import TestimonialsTab from "./DashboardPage/TestimonialsTab";
import ApplicationsTab from "./DashboardPage/JobApplications";
import SportsInfrastructureTab from "./DashboardPage/SportsInfraTab";
import SportsAcademyTab from "./DashboardPage/SportsAcademyTab";

type Tab =
  | "leads"
  | "newsletter"
  | "jobs"
  | "job-applications"
  | "testimonials"
  | "sports"
  | "services"
  | "team"
  | "journey"
  | "sports-infra"
  | "sports-for-all"
  | "sports-academy";

interface TabConfigEntry {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
}
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
        "job-applications",
        "testimonials",
        "sports",
        "services",
        "team",
        "journey",
        "sports-infra",
        "sports-for-all",
        "sports-academy",
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

  const tabConfig: TabConfigEntry[] = [
    { id: "leads", label: "Leads Enquiry", icon: Users, color: "bg-slate-800" },
    {
      id: "newsletter",
      label: "Subscribers",
      icon: Mail,
      color: "bg-zinc-700",
    },
    { id: "jobs", label: "Jobs", icon: Briefcase, color: "bg-indigo-800" },
    {
      id: "job-applications",
      label: "Job Applications",
      icon: Briefcase,
      color: "bg-blue-800",
    },
    { id: "services", label: "Services", icon: Settings, color: "bg-cyan-800" },
    {
      id: "sports-infra",
      label: "Sports Infra",
      icon: Building,
      color: "bg-emerald-800",
    },
    {
      id: "sports-academy",
      label: "Sports Academy",
      icon: GraduationCap,
      color: "bg-indigo-700",
    },
    {
      id: "sports-for-all",
      label: "Sports For All",
      icon: Users,
      color: "bg-teal-800",
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: Star,
      color: "bg-stone-600",
    },
    { id: "sports", label: "Sports", icon: Trophy, color: "bg-gray-700" },
    {
      id: "team",
      label: "Team Members",
      icon: UserCheck,
      color: "bg-neutral-700",
    },
    { id: "journey", label: "Journey Cards", icon: Map, color: "bg-blue-900" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "leads":
        return <LeadsTab />;
      case "newsletter":
        return <NewsletterTab />;
      case "jobs":
        return <JobsTab />;
      case "job-applications":
        return <ApplicationsTab />;
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
      case "sports-infra":
        return <SportsInfrastructureTab />;
      case "sports-academy":
        return <SportsAcademyTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72  bg-white shadow-xl border-r border-gray-200 ">
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

          <nav className="space-y-2 ">
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
                  <span
                    className={`mr-3 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}>
                    <Icon size={20} />
                  </span>
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
