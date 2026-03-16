"use client";

import React, { useState } from "react";
import { Users, Clock, Plus, Save, Edit2, Trash2, Search, Building, Wrench } from "lucide-react";

// Mock Data
const mockUsers = [
  { id: "U001", name: "Somchai Tech", role: "Staff/Outsource", company: "POSNET", email: "somchai@posnet.co.th", status: "Active" },
  { id: "U002", name: "Wichai Tech", role: "Staff/Outsource", company: "POSNET", email: "wichai@posnet.co.th", status: "Active" },
  { id: "U003", name: "Admin HQ", role: "Company", company: "POSNET", email: "admin@posnet.co.th", status: "Active" },
  { id: "U004", name: "Client A", role: "Customer", company: "Bank Of Wealth", email: "client_a@bow.co.th", status: "Active" },
  { id: "U005", name: "Client B", role: "Customer", company: "Retail Corp", email: "contact@retailcorp.com", status: "Inactive" },
];

const mockSlaConfigs = [
  { customer: "Bank Of Wealth", install: 48, service: 24, pm: 72, reprogram: 24 },
  { customer: "Retail Corp", install: 72, service: 48, pm: 120, reprogram: 48 },
  { customer: "Cafe Amazon", install: 24, service: 12, pm: 48, reprogram: 12 },
];

const mockJobConfigs = [
  { id: 1, symptom: "Battery is low", defaultEquipment: "Battery Model X, Charger Cable" },
  { id: 2, symptom: "Screen unresponsive", defaultEquipment: "Touch Screen Panel" },
  { id: 3, symptom: "Printer jammed", defaultEquipment: "Thermal Printer Roller" },
];

export function SettingsView() {
  const [activeTab, setActiveTab] = useState("users"); // "users" | "sla" | "jobconfig"

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col pb-6">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ตั้งค่าระบบ (System Settings)</h2>
          <p className="text-sm text-slate-500 mt-1">จัดการผู้ใช้, สิทธิ์การใช้งาน, SLA และการตั้งค่าระบบต่างๆ</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 mb-6 shrink-0">
        <button 
          onClick={() => setActiveTab("users")}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
        >
          <Users size={18} /> จัดการผู้ใช้งาน
        </button>
        <button 
          onClick={() => setActiveTab("sla")}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'sla' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
        >
          <Clock size={18} /> ตั้งค่าเวลา SLA
        </button>
        <button 
          onClick={() => setActiveTab("jobconfig")}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'jobconfig' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
        >
          <Wrench size={18} /> ตั้งค่าระบบงานซ่อม
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto no-scrollbar">
        {activeTab === 'users' ? <UserManagementTab /> : activeTab === 'sla' ? <SlaConfigurationTab /> : <JobConfigurationTab />}
      </div>
    </div>
  );
}

function UserManagementTab() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <Plus size={16} /> Create New Account
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Company / Customer</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{user.name}</span>
                    <span className="text-[11px] text-slate-500">{user.email}</span>
                  </div>
                </td>
                <td className="py-3 px-6">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                    user.role === 'Company' ? 'bg-purple-100 text-purple-700' : 
                    user.role === 'Customer' ? 'bg-amber-100 text-amber-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-6 font-medium text-slate-600 flex items-center gap-2 mt-2">
                  <Building size={14} className="text-slate-400" /> {user.company}
                </td>
                <td className="py-3 px-6">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SlaConfigurationTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Customer SLA Profiles</h3>
            <p className="text-xs text-slate-500 mt-1">Define target resolution times (in hours) for different job types by customer.</p>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Save size={16} /> Save All Changes
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4 rounded-tl-lg">Customer Account</th>
                <th className="py-4 px-4 text-center">Install (hrs)</th>
                <th className="py-4 px-4 text-center">Service (hrs)</th>
                <th className="py-4 px-4 text-center">PM (hrs)</th>
                <th className="py-4 px-4 text-center rounded-tr-lg">Reprogram (hrs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSlaConfigs.map((config, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800">{config.customer}</td>
                  <td className="py-3 px-4">
                    <input type="number" defaultValue={config.install} className="w-20 mx-auto block text-center bg-white border border-slate-300 rounded-md px-2 py-1 text-sm font-medium focus:border-blue-500 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </td>
                  <td className="py-3 px-4">
                    <input type="number" defaultValue={config.service} className="w-20 mx-auto block text-center bg-white border border-slate-300 rounded-md px-2 py-1 text-sm font-medium focus:border-blue-500 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </td>
                  <td className="py-3 px-4">
                    <input type="number" defaultValue={config.pm} className="w-20 mx-auto block text-center bg-white border border-slate-300 rounded-md px-2 py-1 text-sm font-medium focus:border-blue-500 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </td>
                  <td className="py-3 px-4">
                    <input type="number" defaultValue={config.reprogram} className="w-20 mx-auto block text-center bg-white border border-slate-300 rounded-md px-2 py-1 text-sm font-medium focus:border-blue-500 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
        <div className="text-blue-500 mt-0.5"><Clock size={18} /></div>
        <div>
          <h4 className="text-sm font-bold text-blue-900">How SLA calculation works</h4>
          <p className="text-xs text-blue-800/70 mt-1 leading-relaxed">
            The SLA timer starts immediately when a job is assigned to a technician. A job will be marked as &quot;Warning&quot; when 80% of the SLA time has elapsed, and &quot;Missed&quot; once the time exceeds the configured hours. If a job is &quot;Rescheduled&quot; (Convenient Date), the SLA timer is paused until the new scheduled date.
          </p>
        </div>
      </div>
    </div>
  );
}

function JobConfigurationTab() {
  const [assignmentRules, setAssignmentRules] = useState([
    { type: 'ติดตั้ง (Install)', autoAssign: true },
    { type: 'ซ่อมบำรุง (Service)', autoAssign: true },
    { type: 'บำรุงรักษา (PM)', autoAssign: false },
    { type: 'รีโปรแกรม Onsite', autoAssign: true },
    { type: 'รีโปรแกรม On Call', autoAssign: false }
  ]);

  const toggleRule = (index: number) => {
    const newRules = [...assignmentRules];
    newRules[index].autoAssign = !newRules[index].autoAssign;
    setAssignmentRules(newRules);
  };

  return (
    <div className="space-y-6">
      {/* Job Assignment Rules */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">ตั้งค่าการจ่ายงาน (Assignment Rules)</h3>
            <p className="text-xs text-slate-500 mt-1">กำหนดว่างานแต่ละประเภทจะให้ระบบโยนเข้ามือถือช่างอัตโนมัติ หรือต้องให้ Admin เป็นคนกดจ่ายงานเองแบบ Manual</p>
          </div>
        </div>
        
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignmentRules.map((rule, idx) => (
            <div key={rule.type} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{rule.type}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rule.autoAssign ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {rule.autoAssign ? 'จ่ายงานอัตโนมัติ (Auto)' : 'จ่ายงานแบบ Manual โดย Admin'}
                </span>
              </div>
              
              {/* Toggle Switch */}
              <button 
                onClick={() => toggleRule(idx)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${rule.autoAssign ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${rule.autoAssign ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Symptom Mapping */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">ตั้งค่าเบิกอุปกรณ์อัตโนมัติตามอาการเสีย</h3>
            <p className="text-xs text-slate-500 mt-1">ระบบจะกำหนดรายการอุปกรณ์ที่ต้องใช้แบบ Default ตามอาการเสียที่รับแจ้งจาก HDC</p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Plus size={16} /> เพิ่มการตั้งค่า
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">อาการเสีย / ปัญหาจาก HDC</th>
                <th className="py-4 px-6">อุปกรณ์ที่ต้องใช้ (Default)</th>
                <th className="py-4 px-6 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockJobConfigs.map((config) => (
                <tr key={config.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-medium text-slate-800">{config.symptom}</td>
                  <td className="py-3 px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {config.defaultEquipment}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
