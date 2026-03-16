"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  CheckCircle, Bell, Briefcase, Wrench, ChevronDown, 
  Activity, Calendar, Clock, LogOut
} from "lucide-react";
import { SummaryCard, SlaBadge } from "./SharedComponents";
import { recentJobs } from "./data";

export function CustomerView({ openModal }: { openModal: (id: string) => void }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-blue-100">
      <header className="bg-[#0f172a] text-white h-16 border-b border-white/10 flex items-center justify-between px-6 lg:px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold shadow-md">
            P
          </div>
          <span className="text-xl font-bold tracking-wider hidden sm:block">POSNET</span>
          <span className="text-slate-400 mx-2 hidden sm:block">/</span>
          <span className="text-sm font-medium text-blue-300">Customer Portal</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
            <Bell size={20} />
          </button>
          <div className="h-6 w-px bg-slate-700"></div>
          <button className="flex items-center gap-2 hover:bg-white/5 p-1 pr-2 rounded-full border border-transparent transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium text-sm">
              BW
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold leading-none text-slate-200">Bank Of Wealth</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 ml-1" />
          </button>
          <button 
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 text-sm font-medium text-rose-400 hover:text-rose-300 ml-2 transition-colors bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg"
            title="ออกจากระบบ"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">ออกจากระบบ</span>
          </button>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Service Overview</h1>
            <p className="text-sm text-slate-500 mt-1">Track your job requests, SLA performance, and history.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 shadow-md flex items-center justify-center gap-2">
            <Wrench size={16} /> Request Service
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <SummaryCard title="Active Requests" value="12" icon={<Briefcase size={20} className="text-blue-600" />} bgColor="bg-blue-50" borderColor="border-blue-100" />
          <SummaryCard title="Completed (This Month)" value="45" icon={<CheckCircle size={20} className="text-emerald-600" />} bgColor="bg-emerald-50" borderColor="border-emerald-100" />
          <SummaryCard title="SLA Success Rate" value="98.2%" icon={<Activity size={20} className="text-indigo-600" />} bgColor="bg-indigo-50" borderColor="border-indigo-100" />
          <SummaryCard title="Pending Review" value="3" icon={<Clock size={20} className="text-amber-600" />} bgColor="bg-amber-50" borderColor="border-amber-100" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
              <h2 className="text-base font-bold text-slate-800 mb-1">Your SLA Performance</h2>
              <p className="text-xs text-slate-500 mb-6">Service Level Agreement tracking for all your branches</p>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Install", onTime: 40, missed: 2 },
                    { name: "Service", onTime: 35, missed: 0 },
                    { name: "PM", onTime: 50, missed: 0 },
                  ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', fontSize: '12px'}} />
                    <Legend iconType="circle" wrapperStyle={{fontSize: '11px', fontWeight: 600, color: '#475569', paddingTop:'10px'}}/>
                    <Bar dataKey="onTime" name="On Time" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={32} />
                    <Bar dataKey="missed" name="Missed" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                Upcoming Schedules
              </h2>
              <div className="flex-1 space-y-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase">Mar</span>
                    <span className="text-lg font-black leading-none">14</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">PM Silom Branch</p>
                    <p className="text-xs text-slate-500 mt-0.5">2 Terminals • Tech: Somchai</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded bg-slate-50 text-slate-600 flex flex-col items-center justify-center shrink-0 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase">Mar</span>
                    <span className="text-lg font-black leading-none">15</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Install Asoke Branch</p>
                    <p className="text-xs text-slate-500 mt-0.5">1 Terminal • Pending Tech</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-white">
            <h2 className="text-sm font-bold text-slate-800">Job History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-5">Job ID</th>
                  <th className="py-3 px-5">Type</th>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentJobs.filter(j => j.customer === "Bank Of Wealth").map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-5 font-bold text-slate-800">{job.id}</td>
                    <td className="py-3 px-5 text-slate-600">{job.type}</td>
                    <td className="py-3 px-5 text-slate-600">{job.date}</td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${job.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button className="text-blue-600 hover:underline text-xs font-semibold">View Report</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
