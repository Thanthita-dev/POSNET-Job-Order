"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Bell, Briefcase, User, MapPin, 
  FileCheck2, Navigation, ToggleRight, Map as MapIcon, History, Search, Calendar, LogOut
} from "lucide-react";
import { SlaBadge } from "./SharedComponents";
import { recentJobs, allJobsData } from "./data";

export function StaffMobileView({ jobs, openModal }: { jobs: any[], openModal: (id: string) => void }) {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks"); // "tasks" | "map" | "history" | "profile"

  // Filter history jobs for the technician (mocking "Somchai")
  const historyJobs = jobs.filter(job => job.tech === "Somchai" && job.status !== "In Progress" && job.status !== "Pending");
  const currentTasks = jobs.filter(job => job.tech === "Somchai" && (job.status === "In Progress" || job.status === "Pending"));

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center font-sans sm:p-6">
      {/* Mobile Device Container */}
      <div className="w-full sm:max-w-md bg-slate-50 sm:rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden border-4 border-slate-800">
        
        {/* App Header */}
        <header className="bg-white p-5 border-b border-slate-200 sticky top-0 z-20">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold border border-blue-200">
                SC
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-sm">Somchai (Tech)</h1>
                <p className="text-[10px] text-slate-500 font-medium">BKK Zone</p>
              </div>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-800 bg-slate-50 rounded-full">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-50"></span>
            </button>
          </div>
          
          {/* Status Toggle */}
          <div className={`rounded-xl p-3.5 flex justify-between items-center transition-colors ${isOnline ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-100 border border-slate-200'}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-400'}`}></div>
              <span className={`text-sm font-bold ${isOnline ? 'text-emerald-800' : 'text-slate-600'}`}>
                {isOnline ? 'ออนไลน์ - รับงาน (Online)' : 'ออฟไลน์ (Offline)'}
              </span>
            </div>
            <button onClick={() => setIsOnline(!isOnline)} className="outline-none">
              <ToggleRight size={32} className={`transition-colors ${isOnline ? 'text-emerald-500' : 'text-slate-400'}`} />
            </button>
          </div>
        </header>

        {/* App Content */}
        <div className="flex-1 overflow-y-auto p-5 pb-24 no-scrollbar">
          {activeTab === "tasks" && (
            <>
              {/* Action Area */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">ตำแหน่งปัจจุบัน</h2>
                  {isCheckedIn && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Check-in: 10:05 AM</span>}
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <MapPin size={28} />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-slate-900">Bank Of Wealth, Silom</p>
                    <p className="text-xs font-medium text-slate-500 mt-1">JOB-2026-001 • Install</p>
                  </div>
                  <button 
                    onClick={() => setIsCheckedIn(!isCheckedIn)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isCheckedIn ? 'bg-white text-rose-600 border-2 border-rose-100 hover:bg-rose-50' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 active:scale-95'}`}
                  >
                    <Navigation size={18} />
                    {isCheckedIn ? 'Check Out ออกจากจุดงาน' : 'Check In เข้าจุดงาน'}
                  </button>
                </div>
              </div>

              {/* Task List */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">งานวันนี้</h2>
                <span className="text-[10px] font-bold text-slate-400">เหลือ {currentTasks.length} งาน</span>
              </div>

              <div className="space-y-4">
                {currentTasks.map((job) => (
                  <div key={job.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    {job.status === 'In Progress' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                    
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-800 text-sm">{job.id}</span>
                      <SlaBadge status={job.sla} />
                    </div>
                    <h3 className="font-bold text-blue-600 text-base mb-1">{job.customer}</h3>
                    <p className="text-xs font-medium text-slate-500 mb-4">{job.type} • {job.subType} • {job.area}</p>
                    
                    {job.status === 'In Progress' ? (
                      <button 
                        onClick={() => openModal(job.id)}
                        className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
                      >
                        <FileCheck2 size={16} /> ปิดงาน & อัปโหลดรูปภาพ
                      </button>
                    ) : (
                      <button className="w-full py-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-bold">
                        ดูรายละเอียด
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "history" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-4">
                <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">กรองประวัติ</h2>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs">
                    <Calendar size={14} className="text-slate-500" />
                    <select className="bg-transparent border-none text-slate-600 font-medium focus:outline-none w-full">
                      <option>7 วันล่าสุด</option>
                      <option>เดือนนี้</option>
                      <option>เดือนที่แล้ว</option>
                    </select>
                  </div>
                </div>
              </div>

              <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">งานที่เสร็จแล้ว & เลื่อนนัด</h2>
              <div className="space-y-3">
                {historyJobs.map((job) => (
                  <div key={job.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-800 text-sm">{job.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${job.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {job.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-blue-600 text-sm">{job.customer}</h3>
                    <p className="text-xs text-slate-500 mt-1">{job.type} • {job.date}</p>
                  </div>
                ))}
                {historyJobs.length === 0 && (
                   <div className="text-center py-8 text-slate-400">
                     <p className="text-sm">ไม่พบประวัติงาน</p>
                   </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="animate-in fade-in duration-300">
               <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">บัญชีของฉัน</h2>
               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md mb-3">
                    SC
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">สมชาย (ช่างเทคนิค)</h3>
                  <p className="text-sm text-slate-500 font-medium">somchai@posnet.co.th</p>
                  <p className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-3">โซนกรุงเทพมหานคร</p>
               </div>

               <div className="space-y-2">
                 <button className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-3 font-medium text-sm">
                     <FileCheck2 size={18} className="text-slate-400" /> คู่มือการทำงาน
                   </div>
                 </button>
                 <button 
                   onClick={() => router.push('/login')}
                   className="w-full bg-rose-50 p-4 rounded-xl border border-rose-100 shadow-sm flex items-center justify-between text-rose-600 hover:bg-rose-100 transition-colors mt-4"
                 >
                   <div className="flex items-center gap-3 font-bold text-sm">
                     <LogOut size={18} /> ออกจากระบบ
                   </div>
                 </button>
               </div>
            </div>
          )}

        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[72px] bg-white border-t border-slate-200 flex justify-around items-center px-2 pb-2 z-20 sm:rounded-b-[2.2rem]">
          <button onClick={() => setActiveTab("tasks")} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'tasks' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Briefcase size={22} className="mb-1" />
            <span className="text-[10px] font-bold">งานวันนี้</span>
          </button>
          <button onClick={() => setActiveTab("history")} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'history' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <History size={22} className="mb-1" />
            <span className="text-[10px] font-bold">ประวัติ</span>
          </button>
          <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <User size={22} className="mb-1" />
            <span className="text-[10px] font-bold">โปรไฟล์</span>
          </button>
        </div>

      </div>
    </div>
  );
}
