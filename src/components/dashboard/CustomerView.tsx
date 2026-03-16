"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  CheckCircle, Bell, Briefcase, Wrench, ChevronDown,
  Activity, Calendar, Clock, LogOut, MapPin, TrendingUp, Star, Phone, MessageSquare, Download, ArrowRight, FileText, Search
} from "lucide-react";
import { SummaryCard, SlaBadge } from "./SharedComponents";
import { recentJobs } from "./data";

export function CustomerView({ openModal }: { openModal: (id: string) => void }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-transparent flex flex-col text-white font-sans selection:bg-blue-900/50 relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-emerald-600/8 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[25%] h-[25%] bg-indigo-600/6 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-xl text-white h-20 border-b border-white/8 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-50 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-black shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-400/20">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest leading-none text-white">POSNET</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Partner Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2.5 rounded-xl hover:bg-white/8 transition-all text-slate-400 hover:text-white border border-transparent hover:border-white/10">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950 shadow-[0_0_6px_rgba(59,130,246,0.8)]"></span>
          </button>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-white leading-none">Bank Of Wealth</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Premium Client</p>
            </div>
            <button className="flex items-center gap-2 hover:bg-white/5 p-1.5 pr-3 rounded-2xl border border-white/8 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-black text-xs border border-white/10 group-hover:scale-105 transition-transform">
                BW
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </button>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-400 hover:text-rose-300 transition-all bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2.5 rounded-xl border border-rose-500/20"
          >
            <LogOut size={16} />
            <span className="hidden lg:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 sm:p-8 lg:p-10 overflow-auto relative z-10 no-scrollbar">
        {/* Welcome Hero */}
        <div className="mb-10 relative overflow-hidden rounded-[2.5rem] bg-slate-950/70 backdrop-blur-xl border border-white/8 p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] group">
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-100 rounded-[2.5rem]"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-blue-600/12 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-[80px]"></div>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <CheckCircle size={12} /> Service Account Active
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                ยินดีต้อนรับ, <br className="sm:hidden" />
                <span className="text-gradient-blue">Bank Of Wealth</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
                ติดตามงานซ่อมบำรุง ตรวจสอบ SLA และจัดการอุปกรณ์ POS ทั่วทุกสาขาของคุณได้แบบเรียลไทม์
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none px-8 py-4 bg-blue-600 text-white font-black text-sm rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.35)] hover:bg-blue-500 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 border border-blue-500/30">
                <Wrench size={18} /> แจ้งซ่อมด่วน (Request)
              </button>
              <button className="flex-1 lg:flex-none px-8 py-4 bg-white/8 border border-white/12 text-slate-300 font-black text-sm rounded-2xl hover:bg-white/12 transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
                <Download size={18} /> โหลดรายงานประจำเดือน
              </button>
            </div>
          </div>
        </div>

        {/* Quick KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <SummaryCard title="งานที่กำลังดำเนินการ" value="12" subtitle="Active Job Requests" icon={<Briefcase size={20} className="text-blue-400" />} bgColor="bg-blue-50" borderColor="border-blue-200/60" />
          <SummaryCard title="งานที่สำเร็จ (เดือนนี้)" value="45" subtitle="Resolved this month" icon={<CheckCircle size={20} className="text-emerald-400" />} bgColor="bg-emerald-50" borderColor="border-emerald-200/60" />
          <SummaryCard title="อัตราความสำเร็จ SLA" value="98.2%" subtitle="SLA Performance" icon={<Activity size={20} className="text-indigo-400" />} bgColor="bg-indigo-50" borderColor="border-indigo-200/60" />
          <SummaryCard title="คะแนนความพึงพอใจ" value="4.9" subtitle="Average Rating" icon={<Star size={20} className="text-amber-400" />} bgColor="bg-amber-50" borderColor="border-amber-200/60" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* SLA Analytics Card */}
            <div className="bg-slate-950/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] lg:col-span-2 flex flex-col hover:border-blue-500/20 hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)] transition-all duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">SLA Analytics</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">ประสิทธิภาพการให้บริการแยกตามประเภทงาน</p>
                </div>
                <div className="p-3 bg-blue-500/15 text-blue-400 rounded-2xl border border-blue-500/20"><TrendingUp size={24} /></div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "ติดตั้ง (Install)", onTime: 40, missed: 2 },
                    { name: "ซ่อมบำรุง (Service)", onTime: 35, missed: 0 },
                    { name: "บำรุงรักษา (PM)", onTime: 50, missed: 0 },
                  ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                    <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.03)'}} contentStyle={{borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', color: '#e2e8f0'}} />
                    <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 800, color: '#64748b', paddingTop:'30px'}}/>
                    <Bar dataKey="onTime" name="ทันตามกำหนด (On Time)" stackId="a" fill="#10b981" radius={[0, 0, 6, 6]} barSize={45} />
                    <Bar dataKey="missed" name="เกินกำหนด (Missed)" stackId="a" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming Schedules Card */}
            <div className="bg-slate-950/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col hover:border-indigo-500/20 transition-all duration-500">
              <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/15 text-indigo-400 rounded-2xl border border-indigo-500/20"><Calendar size={20} /></div>
                ตารางงานถัดไป
              </h2>
              <div className="flex-1 space-y-6">
                <div className="flex gap-5 group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center shrink-0 shadow-[0_4px_15px_rgba(59,130,246,0.4)] group-hover/item:scale-110 transition-transform">
                    <span className="text-[10px] font-black uppercase">Mar</span>
                    <span className="text-xl font-black leading-none">14</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-white group-hover/item:text-blue-400 transition-colors">PM - สาขาสีลม</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1.5"><Clock size={12} /> 10:00 AM • 2 เครื่อง</p>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2">Tech: สมชาย ขยันซ่อม</p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/8"></div>

                <div className="flex gap-5 group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 text-slate-400 flex flex-col items-center justify-center shrink-0 border border-white/8 group-hover/item:bg-blue-500/15 group-hover/item:text-blue-400 transition-colors">
                    <span className="text-[10px] font-black uppercase">Mar</span>
                    <span className="text-xl font-black leading-none">15</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-white group-hover/item:text-blue-400 transition-colors">ติดตั้ง - สาขาอโศก</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1.5"><Clock size={12} /> 09:00 AM • 1 เครื่อง</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 italic">รอยืนยันช่างเทคนิค</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-white/5 hover:bg-blue-500/10 text-slate-500 hover:text-blue-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-white/8 hover:border-blue-500/20">
                ดูปฏิทินงานทั้งหมด <ArrowRight size={14} />
              </button>
            </div>
        </div>

        {/* Branch Performance / Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
           {/* Device Summary */}
           <div className="bg-[#060b14] text-white p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/8 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/15 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
              <div className="absolute inset-0 grid-pattern opacity-60 rounded-[2.5rem]"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
              <h2 className="text-xl font-black tracking-tight mb-2 relative z-10 text-white">Device Integrity</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 relative z-10">สรุปสถานะอุปกรณ์ POS ทั้งหมด</p>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-400">Terminals Online</span>
                  <span className="text-2xl font-black text-emerald-400">1,420</span>
                </div>
                <div className="w-full bg-white/8 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_12px_rgba(16,185,129,0.7)]" style={{ width: '96%' }}></div>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-400">Offline / Warning</span>
                  <span className="text-2xl font-black text-rose-400">58</span>
                </div>
                <div className="w-full bg-white/8 rounded-full h-2">
                  <div className="bg-rose-500 h-full rounded-full shadow-[0_0_12px_rgba(244,63,94,0.7)]" style={{ width: '4%' }}></div>
                </div>
              </div>

              <div className="mt-auto pt-8 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/8 flex items-center gap-4">
                  <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/20"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Center 24/7</p>
                    <p className="text-sm font-bold text-white">02-XXX-XXXX</p>
                  </div>
                </div>
              </div>
           </div>

           {/* Job History Table */}
           <div className="lg:col-span-2 bg-slate-950/60 backdrop-blur-xl rounded-[2.5rem] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col hover:border-white/12 transition-all duration-500">
            <div className="p-8 border-b border-white/8 bg-white/3 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Job History</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">ประวัติการรับบริการย้อนหลัง</p>
              </div>
              <button className="p-3 bg-white/5 text-slate-400 rounded-2xl hover:bg-white/10 hover:text-white transition-colors border border-white/8"><Search size={20} /></button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white/3 text-slate-500 font-black text-[10px] uppercase tracking-[0.15em]">
                  <tr>
                    <th className="py-5 px-8">Order ID</th>
                    <th className="py-5 px-8">Type</th>
                    <th className="py-5 px-8 text-center">Completion Date</th>
                    <th className="py-5 px-8 text-center">Status</th>
                    <th className="py-5 px-8 text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {recentJobs.filter(j => j.customer === "Bank Of Wealth").map((job) => (
                    <tr key={job.id} className="hover:bg-white/4 transition-colors group">
                      <td className="py-5 px-8 font-black text-slate-300">{job.id}</td>
                      <td className="py-5 px-8">
                        <span className="font-bold text-slate-400">{job.type}</span>
                      </td>
                      <td className="py-5 px-8 text-center font-bold text-slate-500">{job.date}</td>
                      <td className="py-5 px-8 text-center">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase ${job.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-blue-500/15 text-blue-400 border border-blue-500/25'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-5 px-8 text-right">
                        <button className="p-2.5 bg-white/5 border border-white/10 text-blue-400 rounded-xl hover:bg-blue-500/15 hover:border-blue-500/30 transition-all group-hover:scale-110 active:scale-95">
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-white/3 border-t border-white/8 text-center">
               <button className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors">ดูประวัติทั้งหมด</button>
            </div>
          </div>
        </div>

        {/* Footer Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
           <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] text-white flex items-center justify-between shadow-[0_20px_60px_rgba(59,130,246,0.3)] border border-blue-500/20 group cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20"><MessageSquare size={28} /></div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">ต้องการความช่วยเหลือ?</h3>
                  <p className="text-blue-100 text-sm font-medium">แชทคุยกับฝ่ายสนับสนุนเทคนิคได้ทันที</p>
                </div>
              </div>
              <ArrowRight size={24} className="text-white/50 group-hover:translate-x-2 transition-transform" />
           </div>
           <div className="p-6 bg-slate-950/70 border border-white/8 rounded-[2rem] text-white flex items-center justify-between backdrop-blur-xl group cursor-pointer hover:border-white/15 hover:bg-slate-950/80 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/8 group-hover:bg-blue-500/15 group-hover:border-blue-500/20 transition-colors"><Phone size={28} className="text-blue-400" /></div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">สายด่วนพอสเน็ท</h3>
                  <p className="text-slate-500 text-sm font-medium">บริการแจ้งเหตุขัดข้อง 24 ชั่วโมง</p>
                </div>
              </div>
              <p className="text-xl font-black text-white">02-123-4567</p>
           </div>
        </div>
      </main>
    </div>
  );
}
