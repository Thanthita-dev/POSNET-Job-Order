"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { CompanyView } from "../components/dashboard/CompanyView";
import { CustomerView } from "../components/dashboard/CustomerView";
import { StaffMobileView } from "../components/dashboard/StaffMobileView";
import { CloseJobModal, CreateJobModal } from "../components/dashboard/SharedComponents";
import { allJobsData as initialJobs } from "../components/dashboard/data";

const STORAGE_KEY = "posnet_jobs";

function loadJobs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialJobs;
  } catch {
    return initialJobs;
  }
}

function saveJobs(jobs: any[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch {}
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><RefreshCw className="animate-spin text-blue-600" size={32} /></div>}>
      <DashboardRouter />
    </Suspense>
  );
}

function DashboardRouter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role");

  const [jobs, setJobs] = useState(initialJobs);
  const [isCloseJobModalOpen, setIsCloseJobModalOpen] = useState(false);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    setJobs(loadJobs());
  }, []);

  useEffect(() => {
    if (!role) {
      router.push("/login");
    }
  }, [role, router]);

  if (!role) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><RefreshCw className="animate-spin text-blue-600" size={32} /></div>;
  }

  const updateJobs = (newJobs: any[]) => {
    setJobs(newJobs);
    saveJobs(newJobs);
  };

  const openCloseJobModal = (jobId: string) => {
    const job = jobs.find((j: any) => j.id === jobId);
    setSelectedJob(job || null);
    setIsCloseJobModalOpen(true);
  };

  const closeJobModal = () => setIsCloseJobModalOpen(false);
  const openCreateJobModal = () => setIsCreateJobModalOpen(true);
  const closeCreateJobModal = () => setIsCreateJobModalOpen(false);

  const handleAddJob = (newJob: any) => {
    updateJobs([newJob, ...jobs]);
    setIsCreateJobModalOpen(false);
    setTimeout(() => {
      alert("สร้างใบงานใหม่เรียบร้อยแล้ว!");
    }, 300);
  };

  const handleCloseJob = (jobId: string, resolution: string) => {
    const newStatus = resolution.startsWith("Successfully") ? "Completed" : "Incomplete";
    updateJobs(jobs.map((j: any) => j.id === jobId ? { ...j, status: newStatus } : j));
    setSelectedJob(null);
    setIsCloseJobModalOpen(false);
    setTimeout(() => {
      alert(`ปิดงาน ${jobId} เรียบร้อย!\nสถานะ: ${newStatus}`);
    }, 300);
  };

  const handleAcceptJob = (jobId: string) => {
    updateJobs(jobs.map((j: any) => j.id === jobId ? { ...j, status: "In Progress" } : j));
  };

  return (
    <>
      {role === "company" && <CompanyView jobs={jobs} openModal={openCloseJobModal} openCreateModal={openCreateJobModal} />}
      {role === "customer" && <CustomerView openModal={openCloseJobModal} />}
      {role === "staff" && <StaffMobileView jobs={jobs} openModal={openCloseJobModal} onAcceptJob={handleAcceptJob} />}

      {isCloseJobModalOpen && selectedJob && <CloseJobModal job={selectedJob} onClose={closeJobModal} onSubmit={handleCloseJob} />}
      {isCreateJobModalOpen && <CreateJobModal onClose={closeCreateJobModal} onAddJob={handleAddJob} />}
    </>
  );
}
