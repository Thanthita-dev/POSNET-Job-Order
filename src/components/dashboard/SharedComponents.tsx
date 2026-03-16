"use client";

import React, { useState } from "react";
import { X, UploadCloud, FileCheck2, Cpu, CheckCircle, MapPin, FileText, Wrench, Activity, AlertCircle } from "lucide-react";

export function SummaryCard({ title, value, subtitle, icon, bgColor, borderColor, alert }: any) {
  return (
    <div className={`bg-white/80 backdrop-blur-xl p-5 lg:p-6 rounded-3xl border ${borderColor} shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}>
      {alert && <span className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>}
      {alert && <span className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2.5 rounded-xl ${bgColor} text-slate-700`}>
          {icon}
        </div>
      </div>
      <div className="relative z-10 mt-auto">
        <p className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tighter">{value}</p>
        <h3 className="text-slate-700 text-sm font-extrabold mt-1 tracking-tight">{title}</h3>
        <p className="text-[11px] text-slate-500 font-medium mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export function SlaBadge({ status }: { status: string }) {
  let colorClass = "";
  
  switch(status) {
    case "On Time":
      colorClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
      break;
    case "Warning":
      colorClass = "bg-amber-100 text-amber-800 border-amber-200";
      break;
    case "Missed":
      colorClass = "bg-rose-100 text-rose-800 border-rose-200";
      break;
    default:
      colorClass = "bg-slate-100 text-slate-700 border-slate-200";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Job Order: {job.id} 
              {!isEditing && <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${job.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{job.status}</span>}
            </h3>
            <p className="text-sm text-slate-500">{job.customer} - {job.branch}</p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors">
                <Wrench size={14} /> Edit Details
              </button>
            ) : (
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                Cancel
              </button>
            )}
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex border-b border-slate-100 px-2 bg-slate-50/50">
          <button onClick={() => setActiveTab('info')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'info' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>General Info</button>
          <button onClick={() => setActiveTab('timeline')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Timeline & SLA</button>
          <button onClick={() => setActiveTab('evidence')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'evidence' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Evidence (2)</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {isEditing && (
                 <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3 text-amber-800 text-sm mb-4">
                   <AlertCircle size={18} className="shrink-0 mt-0.5" />
                   <div>
                     <strong className="block mb-1">Admin Edit Mode</strong>
                     You are modifying the record of a closed/processing job. All changes will be logged.
                   </div>
                 </div>
              )}

              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Job Type</span>
                  {isEditing ? (
                    <select value={editData.type} onChange={(e) => setEditData({...editData, type: e.target.value})} className="w-full text-sm p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option>Install</option><option>Service</option><option>PM</option><option>Reprogram</option>
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-slate-800">{job.type}</span>
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                  {isEditing ? (
                    <select value={editData.status} onChange={(e) => setEditData({...editData, status: e.target.value})} className="w-full text-sm p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option>Pending</option><option>In Progress</option><option>Completed</option><option>Incomplete</option><option>Rescheduled</option>
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-slate-800">{job.status}</span>
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Technician</span>
                  {isEditing ? (
                    <select value={editData.tech} onChange={(e) => setEditData({...editData, tech: e.target.value})} className="w-full text-sm p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option>Somchai K.</option><option>Nattawut P.</option><option>Wichai T.</option><option>Unassigned</option>
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-slate-800 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">{job.tech.charAt(0)}</div>
                      {job.tech}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Date</span>
                  {isEditing ? (
                    <input type="date" value={editData.date} onChange={(e) => setEditData({...editData, date: e.target.value})} className="w-full text-sm p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                  ) : (
                    <span className="text-sm font-medium text-slate-800">{job.date}</span>
                  )}
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Equipment Details</span>
                <ul className="space-y-2">
                  {job.equipment.map((eq, i) => (
                    <li key={i} className="text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2">
                      <Activity size={14} className="text-blue-500" />
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Closing Notes</span>
                <p className="text-sm text-slate-700 bg-yellow-50/50 p-3 rounded-lg border border-yellow-100">{job.notes}</p>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
               {/* Timeline Item 1 */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-800 text-sm">Job Completed</h4>
                      <time className="text-xs font-medium text-slate-500">14:30</time>
                    </div>
                    <p className="text-xs text-slate-600">Somchai K. closed the job.</p>
                  </div>
               </div>
               
               {/* Timeline Item 2 */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <MapPin size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-800 text-sm">Arrived at Site</h4>
                      <time className="text-xs font-medium text-slate-500">13:15</time>
                    </div>
                    <p className="text-xs text-slate-600">Checked in at branch location.</p>
                  </div>
               </div>

               {/* Timeline Item 3 */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-800 text-sm">Job Assigned</h4>
                      <time className="text-xs font-medium text-slate-500">09:00</time>
                    </div>
                    <p className="text-xs text-slate-600">System auto-assigned to Somchai K.</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="grid grid-cols-2 gap-4">
              {job.images.map((img, i) => (
                <div key={i} className="group relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                   {/* Using a standard img tag for the mockup to avoid next/image host configuration issues */}
                  <img src={img} alt={`Evidence ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">View Full</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
          {isEditing ? (
             <button onClick={handleSave} className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-2">
               <CheckCircle size={16} /> Save Admin Changes
             </button>
          ) : (
            <>
              <button onClick={onClose} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-100 transition-colors">Close</button>
              <button className="px-5 py-2.5 bg-slate-800 text-white font-bold text-sm rounded-xl hover:bg-slate-900 shadow-md transition-colors flex items-center gap-2">
                <FileText size={16} /> Export PDF
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export function CloseJobModal({ jobId, onClose }: { jobId: string, onClose: () => void }) {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "terminal_front.jpg", size: "1.2 MB" },
    { name: "receipt_test.jpg", size: "0.8 MB" }
  ]);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Close Job Order</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{jobId} - Bank Of Wealth</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto no-scrollbar">
          
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">Resolution Status</label>
            <select className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
              <option>Successfully Completed</option>
              <option>Incomplete - Hardware Issue</option>
              <option>Incomplete - Store Back Flow</option>
            </select>
          </div>

          {/* Multiple Image Upload Area */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-bold text-slate-700">
                Upload Evidence Photos <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Multi-upload Supported</span>
            </div>
            
            <div className="border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <div className="w-12 h-12 bg-white shadow-sm border border-slate-200 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 rounded-full flex items-center justify-center mb-3 transition-colors">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-bold text-slate-700 group-hover:text-blue-700">Tap to select multiple photos</p>
              <p className="text-xs text-slate-500 mt-1">Maximum 10 photos per job</p>
            </div>

            {/* Display selected files */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600 shrink-0">
                        <FileCheck2 size={14} />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-700 truncate">{file.name}</p>
                        <p className="text-[10px] text-slate-400">{file.size}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:bg-rose-50 hover:text-rose-500 p-1.5 rounded transition-colors shrink-0">
                      <X size={14} />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Hardware S/N tracking */}
          <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm mt-0.5 border border-amber-100 text-amber-600">
                <Cpu size={16} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-800 mb-1">Hardware S/N (Serial Number)</label>
                <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">Ensure S/N matches DB. Modify only if equipment was replaced.</p>
                <input type="text" defaultValue="SN-99882233" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold focus:border-blue-500 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
            <CheckCircle size={16} /> Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
