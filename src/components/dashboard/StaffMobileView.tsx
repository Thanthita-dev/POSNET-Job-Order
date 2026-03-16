"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell, Briefcase, User, MapPin,
  FileCheck2, Navigation, ToggleRight, History, Calendar, LogOut, PlayCircle, Sun, Moon, RotateCcw
} from "lucide-react";
import { SlaBadge } from "./SharedComponents";

export function StaffMobileView({ jobs, openModal, onAcceptJob }: { jobs: any[], openModal: (id: string) => void, onAcceptJob: (id: string) => void }) {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");
  const [isLight, setIsLight] = useState(false);

  const historyJobs = jobs.filter(job => job.tech === "Somchai" && job.status !== "In Progress" && job.status !== "Pending");
  const currentTasks = jobs.filter(job => job.tech === "Somchai" && (job.status === "In Progress" || job.status === "Pending"));

  // Theme helpers
  const bg      = isLight ? "bg-[#f0f4f9]"                    : "bg-[#06080f]";
  const appBg   = isLight ? "bg-white"                         : "bg-[#0d1117]";
  const headerBg= isLight ? "bg-white/95 border-slate-200/80"  : "bg-[#0d1117]/95 border-white/8";
  const cardBg  = isLight ? "bg-white border-slate-200/70"     : "bg-slate-900/70 border-white/8";
  const cardHover= isLight? "hover:border-slate-300"           : "hover:border-white/12";
  const tabBg   = isLight ? "bg-white/95 border-slate-200/80"  : "bg-[#0d1117]/95 border-white/8";
  const textMain = isLight ? "text-slate-800"                  : "text-white";
  const textSub  = isLight ? "text-slate-500"                  : "text-slate-500";
  const textMuted= isLight ? "text-slate-400"                  : "text-slate-600";
  const tabActive= isLight ? "text-blue-600"                   : "text-blue-400";
  const tabInact = isLight ? "text-slate-400 hover:text-slate-600" : "text-slate-600 hover:text-slate-400";
  const filterBg = isLight ? "bg-slate-100 border-slate-200"   : "bg-slate-900/70 border-white/8";
  const selectBg = isLight ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-white/5 border-white/8 text-slate-400";
  const bellBorder = isLight ? "border-[#f0f4f9]"              : "border-[#0d1117]";
  const locationCard = isLight ? "bg-slate-50 border-slate-200" : "bg-slate-900/80 border-white/8";
  const shimmer = isLight ? "from-transparent via-blue-400/20 to-transparent" : "from-transparent via-blue-500/40 to-transparent";
  const outerGrad = isLight
    ? "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.06) 0, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(99,102,241,0.04) 0, transparent 50%)"
    : "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.12) 0, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(99,102,241,0.08) 0, transparent 50%)";
  const containerShadow = isLight ? "shadow-[0_40px_100px_rgba(0,0,0,0.12)]" : "shadow-[0_40px_100px_rgba(0,0,0,0.7)]";
  const containerBorder = isLight ? "border-slate-200" : "border-white/10";

  return (
    <div className={`min-h-screen ${bg} flex justify-center font-sans sm:p-6`} style={{ backgroundImage: outerGrad }}>
      <div className={`w-full sm:max-w-md ${appBg} sm:rounded-[2.5rem] ${containerShadow} flex flex-col relative overflow-hidden border ${containerBorder}`}>

        {/* Header */}
        <header className={`${headerBg} backdrop-blur-xl p-5 border-b sticky top-0 z-20`}>
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-400/20">
                SC
              </div>
              <div>
                <h1 className={`font-bold text-sm ${textMain}`}>Somchai (Tech)</h1>
                <p className={`text-[10px] font-medium ${textSub}`}>BKK Zone</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={() => setIsLight(!isLight)}
                className={`p-2 rounded-full border transition-colors ${isLight ? 'bg-slate-100 border-slate-200 text-amber-500 hover:bg-slate-200' : 'bg-white/5 border-white/8 text-slate-400 hover:text-white'}`}
              >
                {isLight ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              {/* Bell */}
              <button className={`relative p-2 rounded-full border transition-colors ${isLight ? 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200' : 'bg-white/5 border-white/8 text-slate-400 hover:text-white'}`}>
                <Bell size={18} />
                <span className={`absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 ${bellBorder} shadow-[0_0_6px_rgba(244,63,94,0.8)]`}></span>
              </button>
            </div>
          </div>

          {/* Online status */}
          <div className={`rounded-xl p-3.5 flex justify-between items-center transition-colors border ${isOnline ? 'bg-emerald-500/10 border-emerald-500/30' : isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/8'}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : isLight ? 'bg-slate-400' : 'bg-slate-600'}`}></div>
              <span className={`text-sm font-bold ${isOnline ? 'text-emerald-500' : textSub}`}>
                {isOnline ? 'ออนไลน์ - รับงาน (Online)' : 'ออฟไลน์ (Offline)'}
              </span>
            </div>
            <button onClick={() => setIsOnline(!isOnline)} className="outline-none">
              <ToggleRight size={32} className={`transition-colors ${isOnline ? 'text-emerald-400' : isLight ? 'text-slate-400' : 'text-slate-600'}`} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className={`flex-1 overflow-y-auto p-5 pb-24 no-scrollbar ${appBg}`}>

          {/* ── Tasks Tab ── */}
          {activeTab === "tasks" && (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className={`text-[11px] font-bold uppercase tracking-widest ${textSub}`}>ตำแหน่งปัจจุบัน</h2>
                  {isCheckedIn && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/25">Check-in: 10:05 AM</span>}
                </div>

                <div className={`${locationCard} p-5 rounded-2xl border flex flex-col items-center justify-center gap-4 relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${shimmer}`}></div>
                  <div className="w-14 h-14 bg-blue-500/15 text-blue-500 rounded-full flex items-center justify-center border border-blue-500/20">
                    <MapPin size={28} />
                  </div>
                  <div className="text-center">
                    <p className={`text-base font-bold ${textMain}`}>Bank Of Wealth, Silom</p>
                    <p className={`text-xs font-medium mt-1 ${textSub}`}>JOB-2026-001 • Install</p>
                  </div>
                  <button
                    onClick={() => setIsCheckedIn(!isCheckedIn)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${isCheckedIn
                      ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20'
                      : 'bg-blue-600 text-white shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:bg-blue-500 border border-blue-500/30'}`}
                  >
                    <Navigation size={18} />
                    {isCheckedIn ? 'Check Out ออกจากจุดงาน' : 'Check In เข้าจุดงาน'}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <h2 className={`text-[11px] font-bold uppercase tracking-widest ${textSub}`}>งานวันนี้</h2>
                <span className={`text-[10px] font-bold ${textSub}`}>เหลือ {currentTasks.length} งาน</span>
              </div>

              <div className="space-y-4">
                {currentTasks.length === 0 && (
                  <div className={`text-center py-10 ${textMuted}`}>
                    <Briefcase size={32} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm">ไม่มีงานในวันนี้</p>
                  </div>
                )}
                {currentTasks.map((job) => (
                  <div key={job.id} className={`${cardBg} ${cardHover} p-4 rounded-xl border relative overflow-hidden transition-colors`}>
                    {job.status === 'In Progress' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-l-xl"></div>}
                    {job.status === 'Pending' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-l-xl"></div>}

                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-bold text-sm ${textSub}`}>{job.id}</span>
                      <SlaBadge status={job.sla} />
                    </div>
                    <h3 className="font-bold text-blue-500 text-base mb-1">{job.customer}</h3>
                    <p className={`text-xs font-medium mb-4 ${textSub}`}>{job.type} • {job.branch || job.area}</p>

                    {job.status === 'In Progress' ? (
                      <button
                        onClick={() => openModal(job.id)}
                        className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.35)] active:scale-95 transition-all hover:bg-blue-500 border border-blue-500/30"
                      >
                        <FileCheck2 size={16} /> ปิดงาน & อัปโหลดรูปภาพ
                      </button>
                    ) : (
                      <button
                        onClick={() => onAcceptJob(job.id)}
                        className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.35)] active:scale-95 transition-all hover:bg-emerald-500 border border-emerald-500/30"
                      >
                        <PlayCircle size={16} /> รับงาน & เริ่มดำเนินการ
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── History Tab ── */}
          {activeTab === "history" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-4">
                <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-3 ${textSub}`}>กรองประวัติ</h2>
                <div className={`${filterBg} p-3 rounded-xl border flex gap-2`}>
                  <div className={`flex-1 flex items-center gap-2 ${selectBg} rounded-lg px-2 py-1.5 text-xs border`}>
                    <Calendar size={14} className={textSub} />
                    <select className={`bg-transparent border-none font-medium focus:outline-none w-full ${textSub}`}>
                      <option>7 วันล่าสุด</option>
                      <option>เดือนนี้</option>
                      <option>เดือนที่แล้ว</option>
                    </select>
                  </div>
                </div>
              </div>

              <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-3 ${textSub}`}>งานที่เสร็จแล้ว & เลื่อนนัด</h2>
              <div className="space-y-3">
                {historyJobs.map((job) => (
                  <div key={job.id} className={`${cardBg} ${cardHover} p-4 rounded-xl border transition-colors`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-bold text-sm ${textSub}`}>{job.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${job.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25' : 'bg-amber-500/15 text-amber-500 border-amber-500/25'}`}>
                        {job.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-blue-500 text-sm">{job.customer}</h3>
                    <p className={`text-xs mt-1 ${textSub}`}>{job.type} • {job.date}</p>
                  </div>
                ))}
                {historyJobs.length === 0 && (
                  <div className={`text-center py-8 ${textMuted}`}>
                    <p className="text-sm">ไม่พบประวัติงาน</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Profile Tab ── */}
          {activeTab === "profile" && (
            <div className="animate-in fade-in duration-300">
              <h2 className={`text-[11px] font-bold uppercase tracking-widest mb-3 ${textSub}`}>บัญชีของฉัน</h2>
              <div className={`${locationCard} p-5 rounded-2xl border mb-6 flex flex-col items-center relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${shimmer}`}></div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)] border-2 border-blue-400/20 mb-3">
                  SC
                </div>
                <h3 className={`font-bold text-lg ${textMain}`}>สมชาย (ช่างเทคนิค)</h3>
                <p className={`text-sm font-medium ${textSub}`}>somchai@posnet.co.th</p>
                <p className="text-xs font-bold text-blue-500 bg-blue-500/15 px-3 py-1 rounded-full mt-3 border border-blue-500/20">โซนกรุงเทพมหานคร</p>
              </div>

              {/* Theme toggle row */}
              <div className={`${cardBg} p-4 rounded-xl border mb-2 flex items-center justify-between`}>
                <div className={`flex items-center gap-3 font-medium text-sm ${textMain}`}>
                  {isLight ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className={textSub} />}
                  {isLight ? 'โหมดสว่าง' : 'โหมดมืด'}
                </div>
                <button
                  onClick={() => setIsLight(!isLight)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isLight ? 'bg-amber-400' : 'bg-white/15'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${isLight ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="space-y-2">
                <button className={`w-full ${cardBg} ${cardHover} p-4 rounded-xl border flex items-center justify-between transition-colors`}>
                  <div className={`flex items-center gap-3 font-medium text-sm ${textMain}`}>
                    <FileCheck2 size={18} className={textSub} /> คู่มือการทำงาน
                  </div>
                </button>
                <button
                  onClick={() => { localStorage.removeItem('posnet_jobs'); window.location.reload(); }}
                  className={`w-full ${cardBg} ${cardHover} p-4 rounded-xl border flex items-center gap-3 transition-colors font-bold text-sm text-amber-500`}
                >
                  <RotateCcw size={18} /> รีเซ็ตข้อมูล Demo
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-rose-500/10 p-4 rounded-xl border border-rose-500/25 flex items-center gap-3 text-rose-500 hover:bg-rose-500/15 transition-colors mt-4 font-bold text-sm"
                >
                  <LogOut size={18} /> ออกจากระบบ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tab Bar */}
        <div className={`absolute bottom-0 left-0 w-full h-[72px] ${tabBg} backdrop-blur-xl border-t flex justify-around items-center px-2 pb-2 z-20 sm:rounded-b-[2.2rem]`}>
          <button onClick={() => setActiveTab("tasks")} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'tasks' ? tabActive : tabInact}`}>
            <Briefcase size={22} className="mb-1" />
            <span className="text-[10px] font-bold">งานวันนี้</span>
          </button>
          <button onClick={() => setActiveTab("history")} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'history' ? tabActive : tabInact}`}>
            <History size={22} className="mb-1" />
            <span className="text-[10px] font-bold">ประวัติ</span>
          </button>
          <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${activeTab === 'profile' ? tabActive : tabInact}`}>
            <User size={22} className="mb-1" />
            <span className="text-[10px] font-bold">โปรไฟล์</span>
          </button>
        </div>

      </div>
    </div>
  );
}
