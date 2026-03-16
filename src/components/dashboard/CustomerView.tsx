"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  CheckCircle, Bell, Briefcase, Wrench, ChevronDown, 
  Activity, Calendar, Clock, LogOut, MapPin, TrendingUp, Star, Phone, MessageSquare, Download
} from "lucide-react";
import { SummaryCard, SlaBadge } from "./SharedComponents";
import { recentJobs } from "./data";

export function CustomerView({ openModal }: { openModal: (id: string) => void }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-slate-900 font-sans selection:bg-blue-100 relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-emerald-50/50 rounded-full blur-[100px]"></div>
      </div>

      <header className="bg-[#060b14] text-white h-20 border-b border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-black shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/10">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest leading-none">POSNET</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Partner Portal</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white border border-transparent hover:border-white/10 backdrop-blur-md">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#060b14]"></span>
          </button>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-white leading-none">Bank Of Wealth</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Premium Client</p>
            </div>
            <button className="flex items-center gap-2 hover:bg-white/5 p-1.5 pr-3 rounded-2xl border border-white/5 transition-all group">
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
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-center gap-8 bg-white border border-slate-200 p-8 lg:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className="relative z-10 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
              <CheckCircle size={12} /> Service Account Active
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">ยินดีต้อนรับ, <br className="sm:hidden" /><span className="text-blue-600">Bank Of Wealth</span></h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl">
              ติดตามงานซ่อมบำรุง ตรวจสอบ SLA และจัดการอุปกรณ์ POS ทั่วทุกสาขาของคุณได้แบบเรียลไทม์
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none px-8 py-4 bg-slate-900 text-white font-black text-sm rounded-2xl shadow-xl hover:bg-black transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
              <Wrench size={18} /> แจ้งซ่อมด่วน (Request)
            </button>
            <button className="flex-1 lg:flex-none px-8 py-4 bg-white border border-slate-200 text-slate-700 font-black text-sm rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Download size={18} /> โหลดรายงานประจำเดือน
            </button>
          </div>
        </div>

        {/* Quick KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <SummaryCard title="งานที่กำลังดำเนินการ" value="12" subtitle="Active Job Requests" icon={<Briefcase size={20} className="text-blue-600" />} bgColor="bg-blue-50" borderColor="border-blue-200/60" />
          <SummaryCard title="งานที่สำเร็จ (เดือนนี้)" value="45" subtitle="Resolved this month" icon={<CheckCircle size={20} className="text-emerald-600" />} bgColor="bg-emerald-50" borderColor="border-emerald-200/60" />
          <SummaryCard title="อัตราความสำเร็จ SLA" value="98.2%" subtitle="SLA Performance" icon={<Activity size={20} className="text-indigo-600" />} bgColor="bg-indigo-50" borderColor="border-indigo-200/60" />
          <SummaryCard title="คะแนนความพึงพอใจ" value="4.9" subtitle="Average Rating" icon={<Star size={20} className="text-amber-600" />} bgColor="bg-amber-50" borderColor="border-amber-200/60" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* SLA Analytics Card */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-xl lg:col-span-2 flex flex-col hover:shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">SLA Analytics</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">ประสิทธิภาพการให้บริการแยกตามประเภทงาน</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><TrendingUp size={24} /></div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "ติดตั้ง (Install)", onTime: 40, missed: 2 },
                    { name: "ซ่อมบำรุง (Service)", onTime: 35, missed: 0 },
                    { name: "บำรุงรักษา (PM)", onTime: 50, missed: 0 },
                  ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                    <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'}} />
                    <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 800, color: '#334155', paddingTop:'30px'}}/>
                    <Bar dataKey="onTime" name="ทันตามกำหนด (On Time)" stackId="a" fill="#10b981" radius={[0, 0, 6, 6]} barSize={45} />
                    <Bar dataKey="missed" name="เกินกำหนด (Missed)" stackId="a" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Upcoming Schedules Card */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-xl flex flex-col hover:shadow-2xl transition-all duration-500">
              <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl"><Calendar size={20} /></div>
                ตารางงานถัดไป
              </h2>
              <div className="flex-1 space-y-6">
                <div className="flex gap-5 group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center shrink-0 shadow-lg group-hover/item:scale-110 transition-transform">
                    <span className="text-[10px] font-black uppercase">Mar</span>
                    <span className="text-xl font-black leading-none">14</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800 group-hover/item:text-blue-600 transition-colors">PM - สาขาสีลม</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1.5"><Clock size={12} /> 10:00 AM • 2 เครื่อง</p>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-2">Tech: สมชาย ขยันซ่อม</p>
                  </div>
                </div>
                
                <div className="w-full h-px bg-slate-100"></div>

                <div className="flex gap-5 group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex flex-col items-center justify-center shrink-0 border border-slate-200 group-hover/item:bg-blue-50 group-hover/item:text-blue-500 transition-colors">
                    <span className="text-[10px] font-black uppercase">Mar</span>
                    <span className="text-xl font-black leading-none">15</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800 group-hover/item:text-blue-600 transition-colors">ติดตั้ง - สาขาอโศก</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1.5"><Clock size={12} /> 09:00 AM • 1 เครื่อง</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">รอยืนยันช่างเทคนิค</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                ดูปฏิทินงานทั้งหมด <ArrowRight size={14} />
              </button>
            </div>
        </div>

        {/* Branch Performance / Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
           {/* Device Summary */}
           <div className="bg-[#060b14] text-white p-8 rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
              <h2 className="text-xl font-black tracking-tight mb-2 relative z-10 text-white">Device Integrity</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 relative z-10">สรุปสถานะอุปกรณ์ POS ทั้งหมด</p>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-400">Terminals Online</span>
                  <span className="text-2xl font-black text-emerald-400">1,420</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_#10b981]" style={{ width: '96%' }}></div>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-400">Offline / Warning</span>
                  <span className="text-2xl font-black text-rose-400">58</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-rose-500 h-full rounded-full shadow-[0_0_10px_#f43f5e]" style={{ width: '4%' }}></div>
                </div>
              </div>

              <div className="mt-auto pt-8 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Center 24/7</p>
                    <p className="text-sm font-bold">02-XXX-XXXX</p>
                  </div>
                </div>
              </div>
           </div>

           {/* Job History Table */}
           <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500">
            <div className="p-8 border-b border-slate-100 bg-white/50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Job History</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">ประวัติการรับบริการย้อนหลัง</p>
              </div>
              <button className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"><Search size={20} /></button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 text-slate-400 font-black text-[10px] uppercase tracking-[0.15em]">
                  <tr>
                    <th className="py-5 px-8">Order ID</th>
                    <th className="py-5 px-8">Type</th>
                    <th className="py-5 px-8 text-center">Completion Date</th>
                    <th className="py-5 px-8 text-center">Status</th>
                    <th className="py-5 px-8 text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentJobs.filter(j => j.customer === "Bank Of Wealth").map((job) => (
                    <tr key={job.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="py-5 px-8 font-black text-slate-700">{job.id}</td>
                      <td className="py-5 px-8">
                        <span className="font-bold text-slate-600">{job.type}</span>
                      </td>
                      <td className="py-5 px-8 text-center font-bold text-slate-500">{job.date}</td>
                      <td className="py-5 px-8 text-center">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase ${job.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-5 px-8 text-right">
                        <button className="p-2.5 bg-white border border-slate-200 text-blue-600 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group-hover:scale-110 active:scale-95">
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
               <button className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">ดูประวัติทั้งหมด</button>
            </div>
          </div>
        </div>

        {/* Footer Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
           <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-blue-900/20 group cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20"><MessageSquare size={28} /></div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">ต้องการความช่วยเหลือ?</h3>
                  <p className="text-blue-100 text-sm font-medium">แชทคุยกับฝ่ายสนับสนุนเทคนิคได้ทันที</p>
                </div>
              </div>
              <ArrowRight size={24} className="text-white/50 group-hover:translate-x-2 transition-transform" />
           </div>
           <div className="p-6 bg-white border border-slate-200 rounded-[2rem] text-slate-800 flex items-center justify-between shadow-sm group cursor-pointer hover:shadow-md transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors"><Phone size={28} className="text-blue-600" /></div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">สายด่วนพอสเน็ท</h3>
                  <p className="text-slate-500 text-sm font-medium">บริการแจ้งเหตุขัดข้อง 24 ชั่วโมง</p>
                </div>
              </div>
              <p className="text-xl font-black text-slate-900">02-123-4567</p>
           </div>
        </div>
      </main>
    </div>
  );
}
