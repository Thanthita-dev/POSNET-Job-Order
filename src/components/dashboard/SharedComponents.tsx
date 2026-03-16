"use client";

import React, { useState } from "react";
import { X, UploadCloud, FileCheck2, Cpu, CheckCircle, MapPin, FileText, Wrench, Activity, AlertCircle, Plus, Zap } from "lucide-react";

export function SummaryCard({ title, value, subtitle, icon, bgColor, borderColor, alert }: any) {
  const isBlue    = bgColor?.includes('blue');
  const isEmerald = bgColor?.includes('emerald');
  const isAmber   = bgColor?.includes('amber');
  const isIndigo  = bgColor?.includes('indigo');
  const isRose    = bgColor?.includes('rose');

  const accentGradient = isBlue    ? 'from-blue-500 to-indigo-500'
    : isEmerald ? 'from-emerald-500 to-teal-500'
    : isAmber   ? 'from-amber-500 to-orange-500'
    : isIndigo  ? 'from-indigo-500 to-violet-500'
    : isRose    ? 'from-rose-500 to-pink-500'
    :             'from-slate-500 to-slate-400';

  const glowShadow = isBlue    ? 'group-hover:shadow-[0_8px_40px_rgba(59,130,246,0.25)]'
    : isEmerald ? 'group-hover:shadow-[0_8px_40px_rgba(16,185,129,0.25)]'
    : isAmber   ? 'group-hover:shadow-[0_8px_40px_rgba(245,158,11,0.25)]'
    : isIndigo  ? 'group-hover:shadow-[0_8px_40px_rgba(99,102,241,0.25)]'
    : isRose    ? 'group-hover:shadow-[0_8px_40px_rgba(244,63,94,0.25)]'
    :             'group-hover:shadow-[0_8px_40px_rgba(100,116,139,0.2)]';

  const valueColor = isBlue    ? 'text-blue-400'
    : isEmerald ? 'text-emerald-400'
    : isAmber   ? 'text-amber-400'
    : isIndigo  ? 'text-indigo-400'
    : isRose    ? 'text-rose-400'
    :             'text-white';

  const iconBg = isBlue    ? 'bg-blue-500/15 border-blue-500/20'
    : isEmerald ? 'bg-emerald-500/15 border-emerald-500/20'
    : isAmber   ? 'bg-amber-500/15 border-amber-500/20'
    : isIndigo  ? 'bg-indigo-500/15 border-indigo-500/20'
    : isRose    ? 'bg-rose-500/15 border-rose-500/20'
    :             'bg-white/5 border-white/10';

  const accentGlow = isBlue    ? 'shadow-[0_0_20px_rgba(59,130,246,0.55)]'
    : isEmerald ? 'shadow-[0_0_20px_rgba(16,185,129,0.55)]'
    : isAmber   ? 'shadow-[0_0_20px_rgba(245,158,11,0.55)]'
    : isIndigo  ? 'shadow-[0_0_20px_rgba(99,102,241,0.55)]'
    : isRose    ? 'shadow-[0_0_20px_rgba(244,63,94,0.55)]'
    :             'shadow-[0_0_20px_rgba(100,116,139,0.4)]';

  return (
    <div className={`noise-overlay card-shimmer relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/95 backdrop-blur-xl p-5 lg:p-6 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 ${glowShadow} shadow-[0_8px_40px_rgba(0,0,0,0.55)]`}>
      {/* Thick accent gradient line with glow */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accentGradient} ${accentGlow} z-10`}></div>
      {/* Inner color glow */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${isBlue ? 'from-blue-500/10' : isEmerald ? 'from-emerald-500/10' : isAmber ? 'from-amber-500/10' : isIndigo ? 'from-indigo-500/10' : isRose ? 'from-rose-500/10' : 'from-white/4'} to-transparent pointer-events-none`}></div>

      {alert && <span className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping z-10"></span>}
      {alert && <span className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_14px_rgba(244,63,94,1)] z-10"></span>}

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2.5 rounded-xl border ${iconBg}`}>
          {icon}
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <p className={`text-3xl lg:text-4xl font-black tracking-tighter ${valueColor}`}>{value}</p>
        <h3 className="text-slate-200 text-sm font-bold mt-1.5 tracking-tight">{title}</h3>
        <p className="text-[11px] text-slate-500 font-medium mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export function SlaBadge({ status }: { status: string }) {
  let colorClass = "";

  switch(status) {
    case "On Time":
      colorClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      break;
    case "Warning":
      colorClass = "bg-amber-500/15 text-amber-400 border-amber-500/30";
      break;
    case "Missed":
      colorClass = "bg-rose-500/15 text-rose-400 border-rose-500/30";
      break;
    default:
      colorClass = "bg-white/8 text-slate-400 border-white/10";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${colorClass}`}>
      {status}
    </span>
  );
}

export function JobDetailsModal({ jobId, onClose }: { jobId: string, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock finding job data
  const job = {
    id: jobId, customer: "Bank Of Wealth", branch: "Silom Branch",
    type: "Install", status: "Completed", date: "2024-03-20", tech: "Somchai K.",
    sla: "On Time", equipment: ["Verifone V200c (SN: 123456)"],
    notes: "Installation successful. Customer trained on basic usage.",
    images: ["https://picsum.photos/seed/1/400/300", "https://picsum.photos/seed/2/400/300"]
  };

  const [editData, setEditData] = useState({
    status: job.status,
    type: job.type,
    tech: job.tech,
    date: job.date
  });

  const handleSave = () => {
    // In a real app, this would send an API request to update the job
    setIsEditing(false);
    alert(`Job ${jobId} updated successfully!\nNew Status: ${editData.status}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0d1117] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)] w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 relative">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent z-10"></div>

        <div className="flex justify-between items-center px-8 py-5 border-b border-white/8 bg-white/3 shrink-0">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2 tracking-tight">
              Job Order: {job.id}
              {!isEditing && <span className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-widest font-black ${job.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-blue-500/15 text-blue-400 border border-blue-500/25'}`}>{job.status}</span>}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-0.5">{job.customer} — {job.branch}</p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-400 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all">
                <Wrench size={13} /> Edit Details
              </button>
            ) : (
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:bg-white/8 hover:text-slate-300 rounded-xl transition-colors">
                Cancel
              </button>
            )}
            <button onClick={onClose} className="p-2.5 text-slate-500 hover:bg-rose-500/15 hover:text-rose-400 rounded-xl transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex border-b border-white/8 px-6 bg-white/3 shrink-0">
          <button onClick={() => setActiveTab('info')} className={`px-4 py-3.5 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'info' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-600 hover:text-slate-400'}`}>General Info</button>
          <button onClick={() => setActiveTab('timeline')} className={`px-4 py-3.5 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-600 hover:text-slate-400'}`}>Timeline & SLA</button>
          <button onClick={() => setActiveTab('evidence')} className={`px-4 py-3.5 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'evidence' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-600 hover:text-slate-400'}`}>Evidence (2)</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {activeTab === 'info' && (
            <div className="space-y-5">
              {isEditing && (
                <div className="bg-amber-500/8 border border-amber-500/25 rounded-xl p-3.5 flex gap-3 text-amber-400 text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-1 font-black">Admin Edit Mode</strong>
                    <span className="text-amber-400/70 text-xs">You are modifying the record of a closed/processing job. All changes will be logged.</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Job Type</span>
                  {isEditing ? (
                    <select value={editData.type} onChange={(e) => setEditData({...editData, type: e.target.value})} className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none">
                      <option className="bg-slate-900">Install</option><option className="bg-slate-900">Service</option><option className="bg-slate-900">PM</option><option className="bg-slate-900">Reprogram</option>
                    </select>
                  ) : (
                    <span className="text-sm font-bold text-white">{job.type}</span>
                  )}
                </div>
                <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Status</span>
                  {isEditing ? (
                    <select value={editData.status} onChange={(e) => setEditData({...editData, status: e.target.value})} className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none">
                      <option className="bg-slate-900">Pending</option><option className="bg-slate-900">In Progress</option><option className="bg-slate-900">Completed</option><option className="bg-slate-900">Incomplete</option><option className="bg-slate-900">Rescheduled</option>
                    </select>
                  ) : (
                    <span className="text-sm font-bold text-white">{job.status}</span>
                  )}
                </div>
                <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Technician</span>
                  {isEditing ? (
                    <select value={editData.tech} onChange={(e) => setEditData({...editData, tech: e.target.value})} className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none">
                      <option className="bg-slate-900">Somchai K.</option><option className="bg-slate-900">Nattawut P.</option><option className="bg-slate-900">Wichai T.</option><option className="bg-slate-900">Unassigned</option>
                    </select>
                  ) : (
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white">{job.tech.charAt(0)}</div>
                      {job.tech}
                    </span>
                  )}
                </div>
                <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Target Date</span>
                  {isEditing ? (
                    <input type="date" value={editData.date} onChange={(e) => setEditData({...editData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none" />
                  ) : (
                    <span className="text-sm font-bold text-white">{job.date}</span>
                  )}
                </div>
              </div>

              <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Equipment Details</span>
                <ul className="space-y-2">
                  {job.equipment.map((eq: string, i: number) => (
                    <li key={i} className="text-sm bg-blue-500/8 border border-blue-500/15 p-2.5 rounded-lg flex items-center gap-2 text-slate-300">
                      <Activity size={14} className="text-blue-400 shrink-0" />
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/4 border border-white/8 rounded-xl p-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Closing Notes</span>
                <p className="text-sm text-slate-400 leading-relaxed">{job.notes}</p>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500/30 bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/4 border border-white/8 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-black text-white text-sm">Job Completed</h4>
                      <time className="text-xs font-bold text-slate-500">14:30</time>
                    </div>
                    <p className="text-xs text-slate-500">Somchai K. closed the job.</p>
                  </div>
               </div>
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/10 bg-white/5 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <MapPin size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/4 border border-white/8 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-black text-white text-sm">Arrived at Site</h4>
                      <time className="text-xs font-bold text-slate-500">13:15</time>
                    </div>
                    <p className="text-xs text-slate-500">Checked in at branch location.</p>
                  </div>
               </div>
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/10 bg-white/5 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/4 border border-white/8 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-black text-white text-sm">Job Assigned</h4>
                      <time className="text-xs font-bold text-slate-500">09:00</time>
                    </div>
                    <p className="text-xs text-slate-500">System auto-assigned to Somchai K.</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="grid grid-cols-2 gap-4">
              {job.images.map((img: string, i: number) => (
                <div key={i} className="group relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/8">
                  <img src={img} alt={`Evidence ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg">View Full</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/8 bg-white/3 flex justify-end gap-3 shrink-0">
          {isEditing ? (
            <button onClick={handleSave} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2 border border-blue-500/30">
              <CheckCircle size={16} /> Save Admin Changes
            </button>
          ) : (
            <>
              <button onClick={onClose} className="px-5 py-2.5 bg-white/5 border border-white/10 text-slate-400 font-bold text-sm rounded-xl hover:bg-white/10 hover:text-white transition-all">Close</button>
              <button className="px-5 py-2.5 bg-white/8 border border-white/12 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-all flex items-center gap-2">
                <FileText size={16} /> Export PDF
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export function CreateJobModal({ onClose, onAddJob }: { onClose: () => void, onAddJob: (job: any) => void }) {
  const [formData, setFormData] = useState({
    customer: "Bank Of Wealth",
    branch: "",
    type: "Install",
    subType: "Hardware",
    desc: "",
    date: new Date().toISOString().split('T')[0],
    tech: "Unassigned",
    area: "BKK",
    isCritical: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: `JOB-2026-${Math.floor(100 + Math.random() * 900)}`,
      customer: formData.customer,
      branch: formData.branch || "General",
      type: formData.type,
      subType: formData.subType,
      status: "Pending",
      sla: formData.isCritical ? "Warning" : "On Time",
      date: formData.date,
      tech: formData.tech,
      area: formData.area
    };
    onAddJob(newJob);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-[#0d1117] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 relative">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent z-10"></div>

        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-white/8 flex justify-between items-center bg-white/3 shrink-0">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">สร้างใบสั่งงานใหม่</h3>
            <p className="text-sm text-slate-500 font-medium">กรอกรายละเอียดเพื่อเปิด Job Order ในระบบ</p>
          </div>
          <button type="button" onClick={onClose} className="p-3 hover:bg-white/8 rounded-2xl transition-all text-slate-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
          
          {/* Section 1: Customer Info */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">ข้อมูลลูกค้าและสถานที่</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1">ลูกค้า (Customer)</label>
                <select 
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                >
                  <option>Bank Of Wealth</option>
                  <option>Retail Corp</option>
                  <option>Cafe Amazon</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1">สาขา (Branch)</label>
                <input 
                  type="text" 
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  placeholder="ระบุชื่อสาขา" 
                  className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Job Details */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">รายละเอียดงาน</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1">ประเภทงาน (Job Type)</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                >
                  <option>Install</option>
                  <option>Service</option>
                  <option>PM</option>
                  <option>Reprogram</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1">ประเภทอุปกรณ์ (Sub-Type)</label>
                <select 
                  value={formData.subType}
                  onChange={(e) => setFormData({...formData, subType: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                >
                  <option>Hardware</option>
                  <option>Software / Setting</option>
                  <option>SIM Card</option>
                  <option>Loader</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 ml-1">อาการเสีย / รายละเอียดงาน</label>
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                placeholder="ระบุอาการเสีย หรือสิ่งที่ต้องการให้ช่างดำเนินการ..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Scheduling */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">การมอบหมายและกำหนดเวลา</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1">วันที่นัดหมาย (Target Date)</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1">มอบหมายช่าง (Assign Technician)</label>
                <select 
                  value={formData.tech}
                  onChange={(e) => setFormData({...formData, tech: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                >
                  <option value="Unassigned">ยังไม่มอบหมาย (Unassigned)</option>
                  <option value="Somchai">Somchai</option>
                  <option value="Wichai">Wichai</option>
                  <option value="Nattawut">Nattawut</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 ml-1">พื้นที่ (Area)</label>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, area: "BKK"})}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${formData.area === "BKK" ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)] border border-blue-500/30' : 'text-slate-500 hover:bg-white/8 hover:text-slate-300'}`}
                  >BKK</button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, area: "UPC"})}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${formData.area === "UPC" ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)] border border-blue-500/30' : 'text-slate-500 hover:bg-white/8 hover:text-slate-300'}`}
                  >UPC</button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-500/8 border border-blue-500/20 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg shadow-[0_4px_12px_rgba(59,130,246,0.4)]"><Zap size={16} /></div>
                <div>
                  <p className="text-sm font-bold text-white">งานด่วนพิเศษ (Critical Service)</p>
                  <p className="text-[10px] text-slate-500 font-medium">ระบบจะส่งแจ้งเตือนหาช่างและ Head ทันที</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({...formData, isCritical: !formData.isCritical})}
                className={`w-12 h-6 rounded-full p-1 relative transition-colors ${formData.isCritical ? 'bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${formData.isCritical ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-white/8 bg-white/3 flex justify-end gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-white/8 hover:text-slate-300 rounded-xl transition-all">
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-black rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(59,130,246,0.5)] transition-all active:scale-95 flex items-center gap-2 border border-blue-500/30">
            <Plus size={18} strokeWidth={3} /> สร้างใบงาน (Create Job)
          </button>
        </div>
      </form>
    </div>
  );
}

export function CloseJobModal({ job, onClose, onSubmit }: { job: any, onClose: () => void, onSubmit: (jobId: string, resolution: string) => void }) {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [resolution, setResolution] = useState("Successfully Completed");
  const [sn, setSn] = useState(job.sn || "");

  const slaBadgeColor = job.sla === "Warning" ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
    : job.sla === "Missed" ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.7)] w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/8 flex justify-between items-center bg-white/3 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white">ปิดใบงาน (Close Job)</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{job.id} · {job.customer} – {job.branch}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/8 rounded-full transition-colors text-slate-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto no-scrollbar space-y-4">

          {/* Equipment Details */}
          <div className="bg-white/4 border border-white/8 rounded-xl p-4 space-y-3">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Equipment Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Terminal ID (TID)</p>
                <p className="text-sm font-mono font-bold text-blue-400 mt-0.5">{job.tid || "–"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Merchant ID (MID)</p>
                <p className="text-sm font-mono font-bold text-blue-400 mt-0.5">{job.mid || "–"}</p>
              </div>
            </div>
          </div>

          {/* Schedule & SLA */}
          <div className="bg-white/4 border border-white/8 rounded-xl p-4 space-y-3">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Schedule & SLA</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SLA Target Date</p>
                <p className="text-sm font-bold text-white mt-0.5">{job.date}</p>
                <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded text-[10px] font-bold border ${slaBadgeColor}`}>{job.sla}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Convenient Date (วันเลื่อนนัด)</p>
                <p className="text-sm font-bold text-slate-300 mt-0.5">{job.convenientDate || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Technician */}
          <div className="bg-white/4 border border-white/8 rounded-xl p-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Technician Assignment</h4>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                {job.tech?.charAt(0) || "?"}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{job.tech || "Unassigned"}</p>
                {job.techType && <p className="text-[10px] text-slate-500 font-medium">{job.techType}</p>}
              </div>
            </div>
          </div>

          {/* Reported Issue */}
          {job.reportedIssue && (
            <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4">
              <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Reported Issue</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{job.reportedIssue}</p>
            </div>
          )}

          {/* Resolution Status */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Resolution Status <span className="text-rose-500">*</span></label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option className="bg-slate-900">Successfully Completed</option>
              <option className="bg-slate-900">Incomplete - Hardware Issue</option>
              <option className="bg-slate-900">Incomplete - Store Back Flow</option>
            </select>
          </div>

          {/* Hardware S/N */}
          <div className="p-4 bg-amber-500/8 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/15 rounded-lg mt-0.5 border border-amber-500/20 text-amber-400">
                <Cpu size={16} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-300 mb-1">Hardware S/N (Serial Number)</label>
                <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">Ensure S/N matches DB. Modify only if equipment was replaced.</p>
                <input
                  type="text"
                  value={sn}
                  onChange={(e) => setSn(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono font-bold text-white focus:border-blue-500/50 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Upload Evidence */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-bold text-slate-300">
                Upload Evidence Photos <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/25">Multi-upload Supported</span>
            </div>
            <div className="border-2 border-dashed border-white/10 bg-white/3 hover:bg-blue-500/5 hover:border-blue-500/30 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/30 rounded-full flex items-center justify-center mb-3 transition-colors">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors">Tap to select multiple photos</p>
              <p className="text-xs text-slate-600 mt-1">Maximum 10 photos per job</p>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/5 border border-white/8 p-2.5 rounded-lg">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-8 h-8 bg-blue-500/15 rounded flex items-center justify-center text-blue-400 shrink-0">
                        <FileCheck2 size={14} />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-300 truncate">{file.name}</p>
                        <p className="text-[10px] text-slate-500">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:bg-rose-500/15 hover:text-rose-400 p-1.5 rounded transition-colors shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/8 bg-white/3 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-white/8 hover:text-slate-300 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(job.id, resolution)}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:bg-blue-500 border border-blue-500/30 transition-all flex items-center gap-2 active:scale-95">
            <CheckCircle size={16} /> Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
