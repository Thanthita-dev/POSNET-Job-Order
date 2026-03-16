"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { CompanyView } from "../components/dashboard/CompanyView";
import { CustomerView } from "../components/dashboard/CustomerView";
import { StaffMobileView } from "../components/dashboard/StaffMobileView";
import { CloseJobModal } from "../components/dashboard/SharedComponents";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><RefreshCw className="animate-spin text-blue-600" size={32} /></div>}>
      <DashboardRouter />
    </Suspense>
  );
}

function DashboardRouter() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "company"; // Default to company if no role is provided

  const [isCloseJobModalOpen, setIsCloseJobModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");

  const openCloseJobModal = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsCloseJobModalOpen(true);
  };

  const closeJobModal = () => setIsCloseJobModalOpen(false);

  return (
    <>
      {role === "company" && <CompanyView openModal={openCloseJobModal} />}
      {role === "customer" && <CustomerView openModal={openCloseJobModal} />}
      {role === "staff" && <StaffMobileView openModal={openCloseJobModal} />}
      
      {isCloseJobModalOpen && <CloseJobModal jobId={selectedJobId} onClose={closeJobModal} />}
    </>
  );
}
