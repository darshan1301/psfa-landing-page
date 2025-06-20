import DashboardPage from "@/components/Dashboard";
import PageLoader from "@/components/ui/PageLoader";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoader message="Loading Content..." />}>
      <DashboardPage />
    </Suspense>
  );
};

export default page;
