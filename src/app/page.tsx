"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { CompanyView } from "../components/dashboard/CompanyView";
import { CustomerView } from "../components/dashboard/CustomerView";
import { StaffMobileView } from "../components/dashboard/StaffMobileView";
import { CloseJobModal, CreateJobModal } from "../components/dashboard/SharedComponents";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><RefreshCw className="animate-spin text-blue-600" size={32} /></div>}>
      <DashboardRouter />
    </Suspense>
  );
}

function DashboardRouter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role");

  useEffect(() => {
    if (!role) {
      router.push("/login");
    }
  }, [role, router]);

  const [isCloseJobModalOpen, setIsCloseJobModalOpen] = useState(false);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");

  if (!role) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><RefreshCw className="animate-spin text-blue-600" size={32} /></div>;
  }

  const openCloseJobModal = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsCloseJobModalOpen(true);
  };

  const closeJobModal = () => setIsCloseJobModalOpen(false);
  
  const openCreateJobModal = () => setIsCreateJobModalOpen(true);
  const closeCreateJobModal = () => setIsCreateJobModalOpen(false);

  return (
    <>
      {role === "company" && <CompanyView openModal={openCloseJobModal} openCreateModal={openCreateJobModal} />}
      {role === "customer" && <CustomerView openModal={openCloseJobModal} />}
      {role === "staff" && <StaffMobileView openModal={openCloseJobModal} />}
      
      {isCloseJobModalOpen && <CloseJobModal jobId={selectedJobId} onClose={closeJobModal} />}
      {isCreateJobModalOpen && <CreateJobModal onClose={closeCreateJobModal} />}
    </>
  );
}
