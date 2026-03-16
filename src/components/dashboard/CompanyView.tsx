"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  AlertTriangle, CheckCircle, Clock, Search, Bell, Menu,
  Briefcase, Wrench, User, ChevronDown, MapPin, 
  Activity, ShieldAlert, Calendar, Filter, FileCheck2, TrendingUp, PieChart as PieChartIcon,
  Download, MoreHorizontal, ArrowUpDown, X, Cpu, MessageSquare, Truck, PenTool, Settings, FileText, CheckSquare, Square, LogOut, Moon, Sun
} from "lucide-react";
import dynamic from 'next/dynamic';

import { SummaryCard, SlaBadge } from "./SharedComponents";
import { SettingsView } from "./SettingsView";
import { slaData, recentJobs, pendingApprovals, missedReasons, jobsByRegion, jobTypesData, allJobsData, alerts } from "./data";

const RealisticMap = dynamic(() => import('./RealisticMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 font-bold">Loading Satellite Map...</div>
});

function NavItem({ icon, label, active = false, sidebarOpen, badge, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`}>
          {icon}
        </div>
        {sidebarOpen && <span className="font-semibold whitespace-nowrap text-sm">{label}</span>}
      </div>
      {sidebarOpen && badge && (
        <span className="flex items-center justify-center px-1.5 min-w-[20px] h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-sm">
          {badge}
        </span>
      )}
    </button>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-100">
        <p className="font-bold text-slate-800 text-sm">{payload[0].name}</p>
        <p className="text-blue-600 font-bold">{payload[0].value} Jobs</p>
      </div>
    );
  }
  return null;
};

function JobDetailsModal({ jobId, onClose }: { jobId: string, onClose: () => void }) {
  const job = allJobsData.find(j => j.id === jobId) || allJobsData[0];
  const [convenientDate, setConvenientDate] = useState(job.date);
  const [isEditingDate, setIsEditingDate] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                {job.id} 
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${job.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  {job.status}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{job.type} • {job.customer} ({job.branch})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto no-scrollbar bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Cpu size={14} className="text-indigo-500" /> Equipment Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold mb-0.5">Terminal ID (TID)</p>
                    <p className="text-sm font-mono font-bold text-slate-800">TID-99882233</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold mb-0.5">Merchant ID (MID)</p>
                    <p className="text-sm font-mono font-bold text-slate-800">MID-1122334455</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-semibold mb-0.5">Hardware S/N</p>
                    <p className="text-sm font-mono font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block">SN-AABBCCDD</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-amber-500" /> Schedule & SLA
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold mb-0.5">SLA Target Date</p>
                      <p className="text-sm font-bold text-slate-800">{job.date}</p>
                    </div>
                    <SlaBadge status={job.sla} />
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] text-slate-400 font-semibold">Convenient Date (วันเลื่อนนัด)</p>
                      <button onClick={() => setIsEditingDate(!isEditingDate)} className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                        <PenTool size={10} /> Edit
                      </button>
                    </div>
                    {isEditingDate ? (
                      <div className="flex gap-2">
                        <input type="date" value={convenientDate} onChange={(e) => setConvenientDate(e.target.value)} className="flex-1 bg-white border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        <button onClick={() => setIsEditingDate(false)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">Save</button>
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded inline-block border border-blue-100">
                        {convenientDate !== job.date ? convenientDate : 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Truck size={14} className="text-emerald-500" /> Technician Assignment
                </h4>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 border-2 border-white shadow-sm">
                    {job.tech !== 'Unassigned' ? job.tech.substring(0,2).toUpperCase() : '?'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{job.tech}</p>
                    <p className="text-[10px] font-medium text-slate-500">{job.tech !== 'Unassigned' ? 'Outsource Team A' : 'Pending Assignment'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MessageSquare size={14} className="text-blue-500" /> Reported Issue
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  เครื่องเปิดไม่ติด หน้าจอขึ้น Battery is low. รบกวนช่างนำแบตเตอรี่สำรองและสายชาร์จใหม่เข้าไปเปลี่ยนด้วย (ข้อมูลดึงจาก HDC)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
            <Download size={16} /> Export Job PDF
          </button>
          {job.status === 'In Progress' && (
            <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 flex items-center gap-2 transition-transform active:scale-95">
              <FileCheck2 size={16} /> Proceed to Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TechnicianMapContent() {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500 pb-6">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Live Workforce Map</h2>
          <p className="text-sm text-slate-500">Real-time GPS tracking of technicians</p>
        </div>
      </div>
      <RealisticMap />
    </div>
  );
}

// --- Report Generator Content ---
function ReportGeneratorContent() {
  const availableColumns = [
    'Job ID', 'Customer', 'Branch', 'Target Date', 'Actual Date', 
    'Job Type', 'Sub Type', 'Region', 'Technician', 'Status', 'SLA Status', 'TID', 'MID', 'Hardware S/N'
  ];
  
  const [selectedCols, setSelectedCols] = useState(['Job ID', 'Customer', 'Job Type', 'Status', 'SLA Status']);

  const toggleCol = (col: string) => {
    setSelectedCols(prev => prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]);
  };

  const selectAll = () => setSelectedCols(availableColumns);
  const deselectAll = () => setSelectedCols([]);

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col pb-6">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Custom Report Generator</h2>
          <p className="text-sm text-slate-500 mt-1">Design and export custom reports based on specific criteria and fields.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-8">
        
        {/* Step 1: Filters */}
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">1</span> 
            Data Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">ช่วงวันที่ (Date Range)</label>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <input type="date" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                <span className="text-slate-400 font-bold hidden sm:block">-</span>
                <input type="date" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">ลูกค้า (Customer)</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                <option>ลูกค้าทั้งหมด</option>
                <option>Bank Of Wealth</option>
                <option>Retail Corp</option>
                <option>Cafe Amazon</option>
              </select>
            </div>
            <div className="col-span-1 lg:col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">ประเภทงาน (Job Type)</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                <option>ทุกประเภท</option>
                <option>Install (ติดตั้ง)</option>
                <option>Service (ซ่อมบำรุง)</option>
                <option>PM (บำรุงรักษา)</option>
                <option>Reprogram</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">สถานะ SLA</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                <option>ทุกสถานะ</option>
                <option>On Time (ทันเวลา)</option>
                <option>Warning (ใกล้กำหนด)</option>
                <option>Missed (เกินเวลา)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Columns */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">2</span> 
              Fields to Include
            </h3>
            <div className="flex gap-3">
              <button onClick={selectAll} className="text-xs font-bold text-blue-600 hover:underline">Select All</button>
              <button onClick={deselectAll} className="text-xs font-bold text-slate-500 hover:underline">Deselect All</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 p-5 border border-slate-200 rounded-xl">
            {availableColumns.map(col => {
              const isSelected = selectedCols.includes(col);
              return (
                <label key={col} className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg transition-all select-none ${isSelected ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                  {isSelected ? <CheckSquare size={16} className="text-blue-600"/> : <Square size={16} className="text-slate-400" />}
                  <span className="text-sm font-medium">{col}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
          <button className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
            <Search size={16} /> ดูตัวอย่าง ({selectedCols.length} คอลัมน์)
          </button>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled={selectedCols.length === 0}>
            <Download size={16} /> ส่งออก Excel / CSV
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Customer Accounts Content ---
function CustomerAccountsContent() {
  const customers = [
    { id: "C001", name: "Bank Of Wealth", branchCount: 150, activeJobs: 12, slaPerformance: "98%", status: "Active" },
    { id: "C002", name: "Retail Corp", branchCount: 320, activeJobs: 45, slaPerformance: "94%", status: "Active" },
    { id: "C003", name: "Cafe Amazon", branchCount: 85, activeJobs: 3, slaPerformance: "100%", status: "Active" },
    { id: "C004", name: "SuperMarket X", branchCount: 42, activeJobs: 0, slaPerformance: "91%", status: "Inactive" },
  ];

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col pb-6">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">บัญชีลูกค้า (Customer Accounts)</h2>
          <p className="text-sm text-slate-500 mt-1">จัดการข้อมูลลูกค้า สาขา และดูภาพรวมการให้บริการ</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
          เพิ่มลูกค้าใหม่
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input type="text" placeholder="ค้นหาลูกค้า..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-64 transition-all" />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">รหัสลูกค้า</th>
                <th className="py-4 px-6">ชื่อลูกค้า (Company Name)</th>
                <th className="py-4 px-6 text-center">จำนวนสาขา</th>
                <th className="py-4 px-6 text-center">งานที่กำลังดำเนินการ</th>
                <th className="py-4 px-6 text-center">% SLA รวม</th>
                <th className="py-4 px-6">สถานะ</th>
                <th className="py-4 px-6 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-500">{cust.id}</td>
                  <td className="py-4 px-6 font-bold text-blue-600 cursor-pointer hover:underline flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs border border-slate-200">{cust.name.substring(0, 2).toUpperCase()}</div>
                    {cust.name}
                  </td>
                  <td className="py-4 px-6 text-center font-medium text-slate-700">{cust.branchCount}</td>
                  <td className="py-4 px-6 text-center">
                    {cust.activeJobs > 0 ? (
                      <span className="bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded-lg text-xs">{cust.activeJobs} งาน</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-emerald-600">{cust.slaPerformance}</td>
                  <td className="py-4 px-6">
                     <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${cust.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${cust.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        {cust.status}
                      </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-blue-600 hover:underline text-xs font-bold">ดูรายละเอียด</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function CompanyView({ openModal }: { openModal: (id: string) => void }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("executive"); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedJobDetailsId, setSelectedJobDetailsId] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans selection:bg-blue-100">
      <aside className={`bg-[#0f172a] text-slate-300 transition-all duration-300 shadow-2xl z-20 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col h-screen sticky top-0 hidden md:flex`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          {sidebarOpen && (
            <span className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">P</div> 
              POSNET
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors ml-auto text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto no-scrollbar">
          <p className={`text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 mt-4 ${!sidebarOpen && 'hidden'} px-3`}>หน้าแดชบอร์ด</p>
          <NavItem icon={<PieChartIcon size={20} />} label="ภาพรวมผู้บริหาร" active={activeTab === "executive"} sidebarOpen={sidebarOpen} onClick={() => setActiveTab("executive")} />
          <NavItem icon={<Activity size={20} />} label="ศูนย์ควบคุมงาน" active={activeTab === "command"} sidebarOpen={sidebarOpen} onClick={() => setActiveTab("command")} />
          
          <p className={`text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 mt-6 ${!sidebarOpen && 'hidden'} px-3`}>ปฏิบัติการ</p>
          <NavItem icon={<MapPin size={20} />} label="แผนที่พิกัดช่าง" active={activeTab === "map"} sidebarOpen={sidebarOpen} onClick={() => setActiveTab("map")} />
          <NavItem icon={<Wrench size={20} />} label="ใบสั่งงานทั้งหมด" active={activeTab === "all-jobs"} sidebarOpen={sidebarOpen} onClick={() => setActiveTab("all-jobs")} />
          <NavItem icon={<FileText size={20} />} label="สร้างรายงาน" active={activeTab === "reports"} sidebarOpen={sidebarOpen} onClick={() => setActiveTab("reports")} />
          <NavItem icon={<CheckCircle size={20} />} label="ติดตาม SLA" active={activeTab === "sla-tracker"} sidebarOpen={sidebarOpen} badge="!" onClick={() => setActiveTab("sla-tracker")} />
          
          <p className={`text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 mt-6 ${!sidebarOpen && 'hidden'} px-3`}>ระบบ</p>
          <NavItem icon={<User size={20} />} label="บัญชีลูกค้า" active={activeTab === "customers"} sidebarOpen={sidebarOpen} onClick={() => setActiveTab("customers")} />
          <NavItem icon={<Settings size={20} />} label="ตั้งค่า & SLA" active={activeTab === "settings"} sidebarOpen={sidebarOpen} onClick={() => setActiveTab("settings")} />
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-white/10 shrink-0 mt-auto">
          <button 
            type="button"
            onClick={() => router.push('/login')}
            className={`flex items-center gap-3 w-full p-3 rounded-xl text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all font-bold cursor-pointer ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>ออกจากระบบ</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8fafc]">
        <header className="bg-white/80 backdrop-blur-md h-16 border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-10 shrink-0">
          <div className="text-lg font-bold text-slate-800 flex items-center gap-3">
            <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              {activeTab === 'executive' ? 'ภาพรวมผู้บริหาร' : activeTab === 'command' ? 'ศูนย์ควบคุมงาน' : activeTab === 'map' ? 'แผนที่พิกัดช่าง' : activeTab === 'reports' ? 'สร้างรายงาน' : activeTab === 'sla-tracker' ? 'ติดตาม SLA' : activeTab === 'customers' ? 'บัญชีลูกค้า' : activeTab === 'settings' ? 'ตั้งค่า & SLA' : 'ใบสั่งงานทั้งหมด'}
            </span>
            <span className={`px-2 py-0.5 rounded flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider border shadow-sm ${activeTab === 'executive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : activeTab === 'command' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeTab === 'executive' ? 'bg-emerald-500' : activeTab === 'command' ? 'bg-rose-500' : 'bg-blue-500'}`}></span>
              ซิงค์ข้อมูลสด
            </span>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-5">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input type="text" placeholder="ค้นหางาน, ลูกค้า..." className="pl-9 pr-4 py-1.5 bg-slate-100 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-48 lg:w-64 transition-all" />
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
              title="สลับโหมดหน้าจอ (Toggle Theme)"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <button className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-full border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center text-white font-medium text-sm shadow-sm">HQ</div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 no-scrollbar">
          {activeTab === 'executive' && <ExecutiveDashboardContent openModal={openModal} />}
          {activeTab === 'command' && <CommandCenterContent openModal={openModal} />}
          {activeTab === 'map' && <TechnicianMapContent />}
          {activeTab === 'all-jobs' && <AllJobOrdersContent openModal={openModal} openDetails={(id) => setSelectedJobDetailsId(id)} />}
          {activeTab === 'reports' && <ReportGeneratorContent />}
          {activeTab === 'sla-tracker' && <SlaTrackerContent />}
          {activeTab === 'customers' && <CustomerAccountsContent />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>
      
      {selectedJobDetailsId && (
        <JobDetailsModal jobId={selectedJobDetailsId} onClose={() => setSelectedJobDetailsId(null)} />
      )}
    </div>
  );
}

function ExecutiveDashboardContent({ openModal }: { openModal: (id: string) => void }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-3 lg:p-4 rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm w-full sm:w-auto">
            <Filter size={14} className="text-slate-500" />
            <span className="font-semibold text-slate-700 whitespace-nowrap">Customer:</span>
            <select className="bg-transparent border-none text-slate-600 font-medium focus:outline-none cursor-pointer w-full">
              <option>All Accounts</option>
              <option>Bank Of Wealth</option>
              <option>Retail Corp</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm w-full sm:w-auto">
            <Calendar size={14} className="text-slate-500" />
            <select className="bg-transparent border-none text-slate-600 font-medium focus:outline-none cursor-pointer w-full">
              <option>Today (Live)</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Q1 2026</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-2xl shadow-lg shadow-blue-900/20 text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500"><Briefcase size={100} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2"><div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm"><Briefcase size={18} /></div><h3 className="font-bold text-blue-100 text-sm">Total Job Orders</h3></div>
            <p className="text-4xl font-black tracking-tight mb-1">1,248</p>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-300"><TrendingUp size={14} /> +12% from last week</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-5 rounded-2xl shadow-lg shadow-emerald-900/20 text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500"><CheckCircle size={100} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2"><div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm"><CheckCircle size={18} /></div><h3 className="font-bold text-emerald-100 text-sm">Overall SLA Success</h3></div>
            <p className="text-4xl font-black tracking-tight mb-1">94.2%</p>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-200">Target: 95% <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 ml-1"></span> Almost there</div>
          </div>
        </div>

        <SummaryCard title="SLA Warning (Near Miss)" value="42" subtitle="Requires immediate attention" icon={<Clock size={20} className="text-amber-600" />} bgColor="bg-amber-50" borderColor="border-amber-100" alert />
        <SummaryCard title="Pending Approvals" value="15" subtitle="Head approval required" icon={<ShieldAlert size={20} className="text-indigo-600" />} bgColor="bg-indigo-50" borderColor="border-indigo-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-2"><h2 className="text-lg font-bold text-slate-800">Job Order Categories</h2><p className="text-xs text-slate-500">Breakdown of work by type</p></div>
          <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={jobTypesData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {jobTypesData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-800">1.2K</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Jobs</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
            {jobTypesData.map(item => (
              <div key={item.name} className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1.5 mb-1"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div><span className="text-xs font-semibold text-slate-600">{item.name}</span></div>
                <span className="text-sm font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="mb-2"><h2 className="text-lg font-bold text-slate-800">Geographical Distribution</h2><p className="text-xs text-slate-500">Comparing workload between Bangkok and Upcountry</p></div>
          <div className="flex-1 flex items-center justify-center min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={jobsByRegion} cx="50%" cy="70%" startAngle={180} endAngle={0} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" stroke="none">
                  {jobsByRegion.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
            <div className="flex justify-center gap-8 mt-2">
              {jobsByRegion.map(item => (
                <div key={item.name} className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-inner" style={{ backgroundColor: `${item.color}20`, color: item.color }}><MapPin size={20} /></div>
                  <div><p className="text-xs font-bold text-slate-500">{item.name} Region</p><p className="text-xl font-black text-slate-800">{item.value}</p></div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </>
  );
}

// --- SLA Tracker Content ---
function SlaTrackerContent() {
  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col pb-6">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">SLA Tracker</h2>
          <p className="text-sm text-slate-500 mt-1">Monitor and manage SLA deadlines and alerts across all active jobs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Alerts Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Bell size={20} className="text-rose-500" /> Critical Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-xl border-l-4 shadow-sm flex flex-col gap-2 ${alert.type === 'critical' ? 'bg-rose-50 border-rose-500' : 'bg-amber-50 border-amber-500'}`}>
                <div className="flex justify-between items-start">
                  <h4 className={`font-bold text-sm ${alert.type === 'critical' ? 'text-rose-800' : 'text-amber-800'}`}>{alert.title}</h4>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full">{alert.time}</span>
                </div>
                <p className="text-xs text-slate-700">{alert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Status Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" /> SLA Overview
          </h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black text-emerald-500 mb-1">87%</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall On-Time</span>
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-black text-amber-500 mb-1">42</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Near Miss (Warning)</span>
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center col-span-2">
                <span className="text-4xl font-black text-rose-500 mb-1">18</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Missed SLA</span>
             </div>
          </div>
        </div>
      </div>

      {/* SLA At-Risk Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800">Jobs At Risk & Missed</h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning</span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Missed</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Job ID</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Technician</th>
                <th className="py-3 px-5">SLA Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allJobsData.filter(j => j.sla === 'Warning' || j.sla === 'Missed').map(job => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-bold text-slate-800">{job.id}</td>
                  <td className="py-3 px-5 text-slate-700">{job.customer}</td>
                  <td className="py-3 px-5 text-slate-600">{job.tech}</td>
                  <td className="py-3 px-5"><SlaBadge status={job.sla} /></td>
                  <td className="py-3 px-5 text-right">
                    <button className="text-blue-600 hover:underline text-xs font-bold">Follow Up</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function CommandCenterContent({ openModal }: { openModal: (id: string) => void }) {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-3 lg:p-4 rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm w-full sm:w-auto">
            <Filter size={14} className="text-slate-500" />
            <span className="font-semibold text-slate-700 whitespace-nowrap">Customer:</span>
            <select className="bg-transparent border-none text-slate-600 font-medium focus:outline-none cursor-pointer w-full">
              <option>All Accounts</option>
              <option>Bank Of Wealth</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm w-full sm:w-auto">
            <Calendar size={14} className="text-slate-500" />
            <select className="bg-transparent border-none text-slate-600 font-medium focus:outline-none cursor-pointer w-full">
              <option>Today (Live)</option>
              <option>This Week</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Active Jobs Today" value="156" subtitle="Across all regions" icon={<Briefcase size={20} className="text-blue-600" />} bgColor="bg-blue-50" borderColor="border-blue-100" />
        <SummaryCard title="SLA Missed" value="18" subtitle="Action required" icon={<AlertTriangle size={20} className="text-rose-600" />} bgColor="bg-rose-50" borderColor="border-rose-100" alert />
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-2xl shadow-sm border border-slate-700 text-white col-span-2 flex items-center justify-around relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10"><MapPin size={100} /></div>
          <div className="relative z-10 flex flex-col items-center"><span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Techs Online</span><span className="text-3xl font-black text-emerald-400">85</span></div>
          <div className="w-px h-10 bg-slate-700 relative z-10"></div>
          <div className="relative z-10 flex flex-col items-center"><span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">On-Site</span><span className="text-3xl font-black text-blue-400">62</span></div>
          <div className="w-px h-10 bg-slate-700 relative z-10"></div>
          <div className="relative z-10 flex flex-col items-center"><span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Idle</span><span className="text-3xl font-black text-slate-300">23</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6"><div><h2 className="text-lg font-bold text-slate-800">SLA Tracking (Live)</h2><p className="text-xs text-slate-500 mt-1">Breakdown of SLA status across different job types</p></div></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={slaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '11px', fontWeight: 600, color: '#475569'}}/>
                <Bar dataKey="onTime" name="On Time" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={40} />
                <Bar dataKey="nearMiss" name="Warning" stackId="a" fill="#f59e0b" />
                <Bar dataKey="missed" name="Missed" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><AlertTriangle size={16} className="text-rose-500" />Top SLA Missed Reasons</h2>
          <div className="space-y-4 flex-1 justify-center flex flex-col">
            {missedReasons.map((reason, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1.5"><span className="font-medium text-slate-600">{reason.name}</span><span className="font-bold text-slate-800">{reason.count}</span></div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-rose-400 h-2 rounded-full" style={{ width: `${(reason.count / 28) * 100}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-amber-50/50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert size={16} className="text-amber-600" /> 
              Pending Approvals
            </h2>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">2 Reqs</span>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {pendingApprovals.map(req => (
              <div key={req.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">{req.type}</span>
                  <span className="text-[10px] text-slate-400 font-medium">By: {req.reqBy}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">{req.desc}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded text-xs font-bold transition-colors">Approve</button>
                  <button className="flex-1 py-1.5 bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 rounded text-xs font-bold transition-colors">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Wrench size={16} className="text-blue-600" /> Active Job Orders
              </h2>
            </div>
            <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/80 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-5">Job ID / Customer</th>
                  <th className="py-3 px-5">Type / Area</th>
                  <th className="py-3 px-5">SLA Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-600 cursor-pointer hover:underline text-xs">{job.id}</span>
                        <span className="font-semibold text-slate-700 text-sm">{job.customer}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700 text-xs">{job.type}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">{job.area} • {job.subType !== '-' ? job.subType : ''}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <SlaBadge status={job.sla} />
                    </td>
                    <td className="py-3.5 px-5 text-right align-middle">
                      {job.status === 'In Progress' ? (
                        <button 
                          onClick={() => openModal(job.id)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5 ml-auto">
                          <FileCheck2 size={14} /> Close Job
                        </button>
                      ) : (
                          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded shadow-sm hover:bg-slate-50 transition-colors ml-auto">
                          Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllJobOrdersContent({ openModal, openDetails }: { openModal: (id: string) => void, openDetails: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = allJobsData.filter(job => {
    const matchesSearch = job.id.toLowerCase().includes(searchTerm.toLowerCase()) || job.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center shrink-0">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-800 font-medium px-3 py-2 rounded-lg text-sm focus:outline-none">
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="py-4 px-6 border-b border-slate-200">Job Order</th>
                <th className="py-4 px-6 border-b border-slate-200">Customer</th>
                <th className="py-4 px-6 border-b border-slate-200">Type</th>
                <th className="py-4 px-6 border-b border-slate-200">Status & SLA</th>
                <th className="py-4 px-6 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => openDetails(job.id)}>{job.id}</td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{job.customer}</td>
                  <td className="py-4 px-6"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">{job.type}</span></td>
                  <td className="py-4 px-6"><SlaBadge status={job.sla} /></td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => openDetails(job.id)} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded shadow-sm hover:bg-slate-50 transition-colors">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
