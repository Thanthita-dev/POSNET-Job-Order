"use client";

import React, { useState } from "react";
import {
  Upload, CreditCard, Monitor, Building2, BarChart2,
  UploadCloud, Download, Search, AlertCircle, CheckCircle,
  PenLine, X, Check, Filter, RefreshCw, Store, Landmark,
  Wrench, Calendar, CalendarClock, Clock, ChevronDown, ChevronUp,
  PackageCheck, RotateCcw, Printer, MessageSquare,
  FileText, ImagePlus, Image as ImageIcon, Zap, ZapOff, Ban,
  Plus, Link2, ClipboardList, UserCheck, History
} from "lucide-react";

/* ─── Mock Data ─────────────────────────────────────────── */
const mockSimStock = [
  { id: "S001", simNo: "SIM-0001234", simSN: "8966000120301234567", carrier: "AIS", status: "In Stock", store: "HQ Warehouse", date: "-" },
  { id: "S002", simNo: "SIM-0001235", simSN: "8966000120301234568", carrier: "DTAC", status: "Deployed", store: "Silom Branch", date: "2026-02-10" },
  { id: "S003", simNo: "SIM-0001236", simSN: "8966000120301234569", carrier: "TRUE", status: "Deployed", store: "Asoke Branch", date: "2026-01-22" },
  { id: "S004", simNo: "SIM-0001237", simSN: "8966000120301234570", carrier: "AIS", status: "Faulty", store: "HQ Warehouse", date: "2026-03-01" },
  { id: "S005", simNo: "SIM-0001238", simSN: "8966000120301234571", carrier: "NT", status: "In Stock", store: "HQ Warehouse", date: "-" },
  { id: "S006", simNo: "SIM-0001239", simSN: "8966000120301234572", carrier: "TRUE", status: "Reserved", store: "Pending Dispatch", date: "2026-03-14" },
  { id: "S007", simNo: "SIM-0001240", simSN: "8966000120301234573", carrier: "DTAC", status: "Deployed", store: "Mega Bangna", date: "2026-02-28" },
  { id: "S008", simNo: "SIM-0001241", simSN: "8966000120301234574", carrier: "AIS", status: "In Stock", store: "HQ Warehouse", date: "-" },
];

const mockEdcStock = [
  { tid: "TID-99882233", sn: "SN-AABBCCDD", model: "Verifone V200c", bank: "BBL", wbs: "WBS-1001", lot: "LOT-2026-01", contract: "CNT-2026-001", status: "Deployed", store: "Silom Branch" },
  { tid: "TID-77553311", sn: "SN-CCDDEE11", model: "Ingenico iCT250", bank: "KTC", wbs: "WBS-1002", lot: "LOT-2026-01", contract: "CNT-2026-002", status: "Deployed", store: "Central Branch" },
  { tid: "TID-44221133", sn: "SN-FF8899AA", model: "PAX A920", bank: "CRC", wbs: "WBS-2001", lot: "LOT-2025-12", contract: "CNT-2025-010", status: "Under Repair", store: "HQ Workshop" },
  { tid: "TID-11223344", sn: "SN-BB1122CC", model: "Verifone V240m", bank: "BBL", wbs: "WBS-1001", lot: "LOT-2026-01", contract: "CNT-2026-003", status: "Deployed", store: "Asoke Branch" },
  { tid: "TID-55667788", sn: "SN-DD3344EE", model: "PAX A930", bank: "UOB", wbs: "WBS-3001", lot: "LOT-2025-11", contract: "CNT-2025-008", status: "In Stock", store: "HQ Warehouse" },
  { tid: "TID-99001122", sn: "SN-EE5566FF", model: "Ingenico iWL252", bank: "CRC", wbs: "WBS-2002", lot: "LOT-2026-02", contract: "CNT-2026-004", status: "Faulty", store: "HQ Warehouse" },
  { tid: "TID-22334455", sn: "SN-GG7788HH", model: "Verifone V200c", bank: "KTC", wbs: "WBS-1003", lot: "LOT-2026-02", contract: "CNT-2026-005", status: "Deployed", store: "Chiang Mai Branch" },
];

const mockWorkshopJobs = [
  {
    id: "WS-2026-001", jobRef: "JOB-2026-005", customer: "Bank Of Wealth", branch: "Silom",
    device: "Verifone V200c", tid: "TID-99882233", sn: "SN-AABBCCDD",
    symptom: "หน้าจอค้าง / เครื่องรีสตาร์ทเอง", receivedDate: "2026-03-10",
    convenientDate: "2026-03-18", status: "In Progress", tech: "ช่างวิชัย",
    note: "รอ Firmware Update จากทีม BBL", postponedCount: 0,
  },
  {
    id: "WS-2026-002", jobRef: "JOB-2026-008", customer: "Cafe Amazon", branch: "Mega Bangna",
    device: "PAX A920", tid: "TID-44221133", sn: "SN-FF8899AA",
    symptom: "เครื่องไม่รับ Card / Chip Error", receivedDate: "2026-03-11",
    convenientDate: "2026-03-17", status: "Waiting Parts", tech: "ช่างสมชาย",
    note: "สั่ง Card Reader Module — ETA 19 มี.ค.", postponedCount: 1,
  },
  {
    id: "WS-2026-003", jobRef: "JOB-2026-003", customer: "7-Eleven", branch: "Sukhumvit",
    device: "Ingenico iWL252", tid: "TID-99001122", sn: "SN-EE5566FF",
    symptom: "เครื่องไม่เชื่อม 4G / SIM ไม่อ่าน", receivedDate: "2026-03-12",
    convenientDate: "2026-03-16", status: "Completed", tech: "ช่างวิชัย",
    note: "เปลี่ยน SIM Module สำเร็จ พร้อมส่งคืน", postponedCount: 0,
  },
  {
    id: "WS-2026-004", jobRef: "JOB-2026-009", customer: "Retail Corp", branch: "Central",
    device: "Verifone V240m", tid: "TID-11223344", sn: "SN-BB1122CC",
    symptom: "Printer ไม่พิมพ์ใบเสร็จ", receivedDate: "2026-03-13",
    convenientDate: "2026-03-20", status: "Received", tech: "-",
    note: "", postponedCount: 0,
  },
  {
    id: "WS-2026-005", jobRef: "JOB-2026-010", customer: "Bank Of Wealth", branch: "Asoke",
    device: "PAX A930", tid: "TID-55667788", sn: "SN-DD3344EE",
    symptom: "Touch screen ไม่ตอบสนอง", receivedDate: "2026-03-14",
    convenientDate: "2026-03-21", status: "In Progress", tech: "ช่างสมชาย",
    note: "", postponedCount: 2,
  },
];

const mockWorksheets = [
  {
    id: "WST-2026-001", jobRef: "JOB-2026-001", customer: "Bank Of Wealth", branch: "Silom",
    device: "Verifone V200c", tid: "TID-99882233", sn: "SN-AABBCCDD",
    tech: "Somchai", openDate: "2026-03-10 09:15", closeDate: "2026-03-10 14:30",
    status: "Closed", autoOpen: true, autoClose: true,
    photos: [
      { id: "p1", name: "before_01.jpg", label: "Before", url: "" },
      { id: "p2", name: "after_01.jpg", label: "After", url: "" },
      { id: "p3", name: "serial_01.jpg", label: "S/N Label", url: "" },
    ],
    log: [
      { time: "09:15", event: "เปิดใบงาน (Auto — Job เปิด)", actor: "System" },
      { time: "09:30", event: "ช่างรับงาน", actor: "Somchai" },
      { time: "14:25", event: "อัปโหลดรูป 3 ใบ", actor: "Somchai" },
      { time: "14:30", event: "ปิดใบงาน (Auto — Job ปิด)", actor: "System" },
    ],
    cancelReason: "",
  },
  {
    id: "WST-2026-002", jobRef: "JOB-2026-002", customer: "7-Eleven", branch: "Sukhumvit",
    device: "Ingenico iWL252", tid: "TID-99001122", sn: "SN-EE5566FF",
    tech: "Somchai", openDate: "2026-03-11 10:00", closeDate: "",
    status: "In Progress", autoOpen: true, autoClose: false,
    photos: [
      { id: "p4", name: "before_02.jpg", label: "Before", url: "" },
    ],
    log: [
      { time: "10:00", event: "เปิดใบงาน (Auto — Job เปิด)", actor: "System" },
      { time: "10:20", event: "ช่างรับงาน", actor: "Somchai" },
      { time: "11:05", event: "อัปโหลดรูป Before", actor: "Somchai" },
    ],
    cancelReason: "",
  },
  {
    id: "WST-2026-003", jobRef: "JOB-2026-004", customer: "Retail Corp", branch: "Central",
    device: "PAX A920", tid: "TID-44221133", sn: "SN-FF8899AA",
    tech: "Wichai", openDate: "2026-03-12 08:45", closeDate: "",
    status: "Open", autoOpen: true, autoClose: true,
    photos: [],
    log: [
      { time: "08:45", event: "เปิดใบงาน (Auto — Job เปิด)", actor: "System" },
    ],
    cancelReason: "",
  },
  {
    id: "WST-2026-004", jobRef: "JOB-2026-006", customer: "Cafe Amazon", branch: "Ladprao",
    device: "Verifone V240m", tid: "TID-11223344", sn: "SN-BB1122CC",
    tech: "Somchai", openDate: "2026-03-13 13:00", closeDate: "2026-03-13 13:45",
    status: "Cancelled", autoOpen: false, autoClose: false,
    photos: [],
    log: [
      { time: "13:00", event: "เปิดใบงาน (Manual)", actor: "Admin" },
      { time: "13:45", event: "ยกเลิกใบงาน", actor: "Admin" },
    ],
    cancelReason: "ลูกค้าขอยกเลิก — อุปกรณ์ส่งกลับมาใช้งานได้แล้ว",
  },
  {
    id: "WST-2026-005", jobRef: "JOB-2026-011", customer: "Cafe Amazon", branch: "Ladprao",
    device: "PAX A930", tid: "TID-55667788", sn: "SN-DD3344EE",
    tech: "Somchai", openDate: "2026-03-16 09:00", closeDate: "",
    status: "Open", autoOpen: true, autoClose: true,
    photos: [],
    log: [
      { time: "09:00", event: "เปิดใบงาน (Auto — Job เปิด)", actor: "System" },
    ],
    cancelReason: "",
  },
];

const mockShops = [
  { id: "SH001", branch: "Silom Branch", customer: "Bank Of Wealth", locCode: "BOW-SIL-001", locDummy: "DM-0001", address: "123 Silom Rd, Bang Rak, Bangkok 10500" },
  { id: "SH002", branch: "Asoke Branch", customer: "Bank Of Wealth", locCode: "BOW-ASK-002", locDummy: "DM-0002", address: "87 Sukhumvit 21, Asoke, Bangkok 10110" },
  { id: "SH003", branch: "Central Branch", customer: "Retail Corp", locCode: "RC-CTR-001", locDummy: "DM-0010", address: "Central World, Pathum Wan, Bangkok 10330" },
  { id: "SH004", branch: "Mega Bangna", customer: "Retail Corp", locCode: "RC-BNG-002", locDummy: "DM-0011", address: "39 Bangna-Trad Rd, Bangna, Bangkok 10260" },
  { id: "SH005", branch: "Siam Branch", customer: "Cafe Amazon", locCode: "CA-SIM-001", locDummy: "DM-0020", address: "Siam Paragon, Pathum Wan, Bangkok 10330" },
  { id: "SH006", branch: "Sukhumvit Branch", customer: "7-Eleven", locCode: "7E-SUK-001", locDummy: "DM-0030", address: "123 Sukhumvit Rd, Watthana, Bangkok 10110" },
];

const mockImportPreview = [
  { row: 1, tid: "TID-99882233", merchant: "Bank Of Wealth Silom", amount: "1,500.00", date: "2026-03-15", ref: "REF2026-001", valid: true },
  { row: 2, tid: "TID-INVALID99", merchant: "N/A", amount: "N/A", date: "2026-03-15", ref: "REF2026-002", valid: false, error: "TID not found in system" },
  { row: 3, tid: "TID-77553311", merchant: "Retail Corp Central", amount: "2,300.00", date: "2026-03-15", ref: "REF2026-003", valid: true },
  { row: 4, tid: "TID-44221133", merchant: "Cafe Amazon Mega", amount: "850.00", date: "2026-03-14", ref: "REF2026-004", valid: true },
  { row: 5, tid: "TID-00000000", merchant: "N/A", amount: "3,200.00", date: "2026-03-14", ref: "REF2026-005", valid: false, error: "TID+SN mismatch — data not pulled" },
];

/* ─── Helpers ────────────────────────────────────────────── */
function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${active ? "border-blue-500 text-blue-400" : "border-transparent text-slate-600 hover:text-slate-400"}`}>
      {icon} {label}
    </button>
  );
}

function StockBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "In Stock": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    "Deployed": "bg-blue-500/15 text-blue-400 border-blue-500/25",
    "Faulty": "bg-rose-500/15 text-rose-400 border-rose-500/25",
    "Reserved": "bg-amber-500/15 text-amber-400 border-amber-500/25",
    "Under Repair": "bg-violet-500/15 text-violet-400 border-violet-500/25",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${map[status] || "bg-white/8 text-slate-400 border-white/10"}`}>{status}</span>;
}

/* ─── Import Order Tab ───────────────────────────────────── */
function ImportOrderTab() {
  const [bank, setBank] = useState("BBL");
  const [uploaded, setUploaded] = useState(false);
  const banks = ["BBL", "KTC", "CRC", "UOB"];
  const bankColor: Record<string, string> = { BBL: "bg-blue-600", KTC: "bg-indigo-600", CRC: "bg-emerald-600", UOB: "bg-violet-600" };
  const validRows = mockImportPreview.filter(r => r.valid).length;
  const errorRows = mockImportPreview.filter(r => !r.valid).length;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Bank Selector */}
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">เลือกธนาคาร / Partition</p>
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
          {banks.map(b => (
            <button key={b} onClick={() => setBank(b)} className={`px-5 py-2 rounded-lg text-xs font-black transition-all ${bank === b ? `${bankColor[b]} text-white shadow-lg` : "text-slate-500 hover:text-slate-300"}`}>{b}</button>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      {!uploaded ? (
        <div onClick={() => setUploaded(true)} className="border-2 border-dashed border-white/10 bg-white/3 hover:bg-blue-500/5 hover:border-blue-500/30 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
          <div className="w-14 h-14 bg-white/5 border border-white/10 text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/30 rounded-2xl flex items-center justify-center mb-4 transition-colors">
            <UploadCloud size={26} />
          </div>
          <p className="text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors">คลิกเพื่อเลือกไฟล์ Import Order ({bank})</p>
          <p className="text-xs text-slate-600 mt-1">รองรับ .xlsx, .csv — ขนาดสูงสุด 10MB</p>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Summary */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3">
              <CheckCircle size={16} className="text-emerald-400" />
              <div><p className="text-xs font-black text-emerald-400">{validRows} รายการผ่าน</p></div>
            </div>
            <div className="flex-1 flex items-center gap-3 bg-rose-500/10 border border-rose-500/25 rounded-xl px-4 py-3">
              <AlertCircle size={16} className="text-rose-400" />
              <div><p className="text-xs font-black text-rose-400">{errorRows} รายการมีปัญหา</p></div>
            </div>
            <button onClick={() => setUploaded(false)} className="px-4 py-3 bg-white/5 border border-white/10 text-slate-400 rounded-xl hover:bg-white/10 transition-colors"><X size={16} /></button>
          </div>

          {/* Preview Table */}
          <div className="bg-slate-950/60 rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/8">
                  {["Row", "TID", "Merchant Name", "Amount", "Date", "Ref", "Status"].map(h => (
                    <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockImportPreview.map(r => (
                  <tr key={r.row} className={`transition-colors ${r.valid ? "hover:bg-white/4" : "bg-rose-500/5 hover:bg-rose-500/8"}`}>
                    <td className="py-3 px-4 text-slate-500 text-xs">{r.row}</td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-300">{r.tid}</td>
                    <td className="py-3 px-4 text-xs text-slate-300">{r.merchant}</td>
                    <td className="py-3 px-4 text-xs text-slate-300">{r.amount}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{r.date}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{r.ref}</td>
                    <td className="py-3 px-4">
                      {r.valid ? <CheckCircle size={14} className="text-emerald-400" /> : (
                        <div className="flex items-center gap-1.5">
                          <AlertCircle size={14} className="text-rose-400 shrink-0" />
                          <span className="text-[10px] text-rose-400">{r.error}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors">แก้ไขข้อมูล</button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all border border-blue-500/30">
              <Upload size={15} /> Import {validRows} รายการ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Stock SIM Tab ──────────────────────────────────────── */
function StockSimTab() {
  const [search, setSearch] = useState("");
  const [carrier, setCarrier] = useState("ทั้งหมด");
  const [status, setStatus] = useState("ทั้งหมด");
  const carriers = ["ทั้งหมด", "AIS", "DTAC", "TRUE", "NT"];
  const statuses = ["ทั้งหมด", "In Stock", "Deployed", "Faulty", "Reserved"];
  const filtered = mockSimStock.filter(s =>
    (carrier === "ทั้งหมด" || s.carrier === carrier) &&
    (status === "ทั้งหมด" || s.status === status) &&
    (s.simNo.includes(search) || s.simSN.includes(search) || s.store.toLowerCase().includes(search.toLowerCase()))
  );
  const summaryCount = (st: string) => mockSimStock.filter(s => s.status === st).length;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Summary chips */}
      <div className="flex gap-3 flex-wrap">
        {[["In Stock", "emerald", summaryCount("In Stock")], ["Deployed", "blue", summaryCount("Deployed")], ["Reserved", "amber", summaryCount("Reserved")], ["Faulty", "rose", summaryCount("Faulty")]].map(([label, color, count]) => (
          <div key={label as string} className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-${color}-500/10 border border-${color}-500/25`}>
            <span className={`text-xs font-black text-${color}-400`}>{count}</span>
            <span className={`text-[11px] text-${color}-400 font-medium`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหา SIM No, SN, ร้านค้า..." className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
        </div>
        <select value={carrier} onChange={e => setCarrier(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all">
          {carriers.map(c => <option key={c} className="bg-slate-900">{c}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all">
          {statuses.map(s => <option key={s} className="bg-slate-900">{s}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors"><Upload size={14} /> Import</button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all"><Download size={14} /> Export</button>
      </div>

      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/8">
              {["SIM No.", "SIM SN", "Carrier", "สถานะ", "ร้านค้า / สาขา", "วันที่ติดตั้ง"].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-white/4 transition-colors">
                <td className="py-3 px-4 font-mono text-xs font-bold text-blue-400">{s.simNo}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{s.simSN}</td>
                <td className="py-3 px-4"><span className="text-xs font-bold text-slate-300 bg-white/8 px-2 py-0.5 rounded border border-white/10">{s.carrier}</span></td>
                <td className="py-3 px-4"><StockBadge status={s.status} /></td>
                <td className="py-3 px-4 text-xs text-slate-300">{s.store}</td>
                <td className="py-3 px-4 text-xs text-slate-400">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Stock EDC Tab ──────────────────────────────────────── */
function StockEdcTab() {
  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("ทั้งหมด");
  const banks = ["ทั้งหมด", "BBL", "KTC", "CRC", "UOB"];
  const filtered = mockEdcStock.filter(e =>
    (bankFilter === "ทั้งหมด" || e.bank === bankFilter) &&
    (e.tid.includes(search) || e.sn.includes(search) || e.model.toLowerCase().includes(search.toLowerCase()) || e.store.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหา TID, SN, Model, ร้านค้า..." className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
        </div>
        <select value={bankFilter} onChange={e => setBankFilter(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all">
          {banks.map(b => <option key={b} className="bg-slate-900">{b}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all"><Download size={14} /> Export รายธนาคาร</button>
      </div>

      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-x-auto shadow-sm">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="bg-white/5 border-b border-white/8">
              {["TID", "S/N", "Model", "Bank", "WBS", "LOT No.", "Contract No.", "สถานะ", "ร้านค้า"].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(e => (
              <tr key={e.tid} className="hover:bg-white/4 transition-colors">
                <td className="py-3 px-4 font-mono text-xs font-bold text-blue-400">{e.tid}</td>
                <td className="py-3 px-4 font-mono text-xs text-slate-300">{e.sn}</td>
                <td className="py-3 px-4 text-xs text-slate-300">{e.model}</td>
                <td className="py-3 px-4"><span className="text-[10px] font-black px-2 py-0.5 rounded border bg-slate-700/50 text-slate-300 border-white/10">{e.bank}</span></td>
                <td className="py-3 px-4 font-mono text-xs text-amber-400">{e.wbs}</td>
                <td className="py-3 px-4 font-mono text-xs text-slate-400">{e.lot}</td>
                <td className="py-3 px-4 font-mono text-xs text-slate-400">{e.contract}</td>
                <td className="py-3 px-4"><StockBadge status={e.status} /></td>
                <td className="py-3 px-4 text-xs text-slate-300">{e.store}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Shops Tab ──────────────────────────────────────────── */
function ShopsTab() {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [shops, setShops] = useState(mockShops);
  const [editData, setEditData] = useState<any>({});
  const filtered = shops.filter(s => s.branch.toLowerCase().includes(search.toLowerCase()) || s.customer.toLowerCase().includes(search.toLowerCase()) || s.locCode.includes(search));

  const startEdit = (s: any) => { setEditingId(s.id); setEditData({ ...s }); };
  const saveEdit = () => { setShops(shops.map(s => s.id === editingId ? editData : s)); setEditingId(null); };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหาสาขา, ลูกค้า, Location Code..." className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all"><Download size={14} /> Export</button>
      </div>

      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/8">
              {["Branch Name", "Customer", "Location Code", "Location Dummy", "Address", ""].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-white/4 transition-colors">
                {editingId === s.id ? (
                  <>
                    <td className="py-2 px-3" colSpan={4}>
                      <div className="grid grid-cols-4 gap-2">
                        {["branch", "customer", "locCode", "locDummy"].map(f => (
                          <input key={f} value={editData[f]} onChange={e => setEditData({ ...editData, [f]: e.target.value })} className="bg-white/5 border border-blue-500/40 text-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500/30" />
                        ))}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <input value={editData.address} onChange={e => setEditData({ ...editData, address: e.target.value })} className="w-full bg-white/5 border border-blue-500/40 text-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500/30" />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex gap-1">
                        <button onClick={saveEdit} className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors"><Check size={13} /></button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-white/8 text-slate-400 hover:bg-white/12 transition-colors"><X size={13} /></button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3.5 px-4 text-xs font-bold text-slate-200">{s.branch}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{s.customer}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-blue-400">{s.locCode}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{s.locDummy}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 max-w-[200px] truncate">{s.address}</td>
                    <td className="py-3.5 px-4">
                      <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition-colors"><PenLine size={13} /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Worksheet Tab ──────────────────────────────────────── */
function WstBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Open":        "bg-sky-500/15 text-sky-400 border-sky-500/25",
    "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/25",
    "Closed":      "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    "Cancelled":   "bg-rose-500/15 text-rose-400 border-rose-500/25",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${map[status] || "bg-white/8 text-slate-400 border-white/10"}`}>{status}</span>;
}

function CreateWorksheetModal({ onClose, onSave }: { onClose: () => void; onSave: (ws: any) => void }) {
  const [jobRef, setJobRef] = useState("");
  const [customer, setCustomer] = useState("");
  const [branch, setBranch] = useState("");
  const [device, setDevice] = useState("");
  const [tid, setTid] = useState("");
  const [sn, setSn] = useState("");
  const [tech, setTech] = useState("Somchai");
  const [autoOpen, setAutoOpen] = useState(true);
  const [autoClose, setAutoClose] = useState(true);
  const [resolved, setResolved] = useState(false);

  const handleJobRefBlur = () => {
    if (jobRef === "JOB-2026-011") {
      setCustomer("Cafe Amazon"); setBranch("Ladprao");
      setDevice("PAX A930"); setTid("TID-55667788"); setSn("SN-DD3344EE");
      setResolved(true);
    } else if (jobRef.startsWith("JOB-")) {
      setCustomer("Bank Of Wealth"); setBranch("Silom");
      setDevice("Verifone V200c"); setTid("TID-99882233"); setSn("SN-AABBCCDD");
      setResolved(true);
    } else {
      setResolved(false);
    }
  };

  const handleSave = () => {
    const newId = `WST-2026-${String(mockWorksheets.length + 1).padStart(3, "0")}`;
    onSave({
      id: newId, jobRef, customer, branch, device, tid, sn, tech,
      openDate: new Date().toISOString().slice(0, 16).replace("T", " "),
      closeDate: "", status: autoOpen ? "Open" : "Open",
      autoOpen, autoClose, photos: [],
      log: [{ time: new Date().toTimeString().slice(0, 5), event: autoOpen ? "เปิดใบงาน (Auto — Job เปิด)" : "เปิดใบงาน (Manual)", actor: autoOpen ? "System" : "Admin" }],
      cancelReason: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-400">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-white">สร้างใบงานใหม่</p>
              <p className="text-[11px] text-slate-500">Worksheet</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition-colors"><X size={16} /></button>
        </div>

        <div className="space-y-4">
          {/* Job Reference */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">อ้างอิง Job OP <span className="text-rose-400">*</span></label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input value={jobRef} onChange={e => { setJobRef(e.target.value); setResolved(false); }} onBlur={handleJobRefBlur}
                  placeholder="เช่น JOB-2026-011"
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all" />
              </div>
              <button onClick={handleJobRefBlur} className="px-4 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors whitespace-nowrap">
                <Search size={14} />
              </button>
            </div>
            {resolved && (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl">
                <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                <p className="text-[11px] text-emerald-400">พบข้อมูล Job — กรอกอัตโนมัติแล้ว</p>
              </div>
            )}
          </div>

          {/* Auto-filled info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "ลูกค้า", val: customer, set: setCustomer },
              { label: "สาขา", val: branch, set: setBranch },
              { label: "อุปกรณ์", val: device, set: setDevice },
              { label: "TID", val: tid, set: setTid },
              { label: "S/N", val: sn, set: setSn },
            ].map(({ label, val, set }) => (
              <div key={label} className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">{label}</label>
                <input value={val} onChange={e => set(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/8 text-slate-300 rounded-xl text-sm focus:outline-none focus:border-sky-500/40 transition-all" />
              </div>
            ))}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">ช่างผู้รับผิดชอบ</label>
              <select value={tech} onChange={e => setTech(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/8 text-slate-300 rounded-xl text-sm focus:outline-none focus:border-sky-500/40 transition-all">
                {["Somchai", "Wichai", "Prasit"].map(t => <option key={t} className="bg-slate-900">{t}</option>)}
              </select>
            </div>
          </div>

          {/* Auto-open / Auto-close toggles */}
          <div className="bg-white/4 border border-white/8 rounded-xl p-4 space-y-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">การตั้งค่าอัตโนมัติ</p>
            {[
              { label: "Auto-Open", desc: "เปิดใบงานอัตโนมัติเมื่อ Job เปิด", val: autoOpen, set: setAutoOpen, icon: <Zap size={14} /> },
              { label: "Auto-Close", desc: "ปิดใบงานอัตโนมัติเมื่อ Job ปิด", val: autoClose, set: setAutoClose, icon: <Zap size={14} /> },
            ].map(({ label, desc, val, set, icon }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={val ? "text-sky-400" : "text-slate-600"}>{icon}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-300">{label}</p>
                    <p className="text-[11px] text-slate-500">{desc}</p>
                  </div>
                </div>
                <button onClick={() => set(!val)} className={`relative w-11 h-6 rounded-full transition-colors ${val ? "bg-sky-500" : "bg-white/10"}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${val ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors">ยกเลิก</button>
          <button onClick={handleSave} disabled={!jobRef}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white font-black text-sm rounded-xl shadow-lg shadow-sky-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0">
            <FileText size={14} /> สร้างใบงาน
          </button>
        </div>
      </div>
    </div>
  );
}

function CancelWorksheetModal({ ws, onClose, onConfirm }: { ws: any; onClose: () => void; onConfirm: (id: string, reason: string) => void }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-400">
            <Ban size={18} />
          </div>
          <div>
            <p className="text-sm font-black text-white">ยืนยันยกเลิกใบงาน</p>
            <p className="text-[11px] text-slate-500">{ws.id} · {ws.device}</p>
          </div>
        </div>
        <div className="bg-rose-500/8 border border-rose-500/20 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-rose-400">การยกเลิกใบงานจะ<span className="font-black">ไม่สามารถย้อนกลับได้</span> และจะบันทึกลงในประวัติการดำเนินการ</p>
        </div>
        <div className="space-y-1.5 mb-5">
          <label className="text-xs font-bold text-slate-400">เหตุผลการยกเลิก <span className="text-rose-400">*</span></label>
          <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="ระบุเหตุผล..."
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm resize-none focus:outline-none focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/10 transition-all" />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors">ย้อนกลับ</button>
          <button onClick={() => reason && onConfirm(ws.id, reason)} disabled={!reason}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0">
            <Ban size={14} /> ยืนยันยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

function PhotoUploadZone({ wsId, photos, onAdd }: { wsId: string; photos: any[]; onAdd: (wsId: string, label: string) => void }) {
  const [label, setLabel] = useState("Before");
  const labels = ["Before", "After", "S/N Label", "อื่นๆ"];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <select value={label} onChange={e => setLabel(e.target.value)}
          className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none transition-all">
          {labels.map(l => <option key={l} className="bg-slate-900">{l}</option>)}
        </select>
        <button onClick={() => onAdd(wsId, label)}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500/15 border border-sky-500/25 text-sky-400 font-bold text-xs rounded-xl hover:bg-sky-500/20 transition-colors">
          <ImagePlus size={13} /> เพิ่มรูป ({label})
        </button>
        <span className="text-[11px] text-slate-600">{photos.length} รูปแล้ว</span>
      </div>
      {photos.length > 0 ? (
        <div className="flex gap-3 flex-wrap">
          {photos.map((p: any) => (
            <div key={p.id} className="flex flex-col items-center gap-1.5 w-24">
              <div className="w-24 h-20 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-slate-600 hover:border-sky-500/30 transition-colors">
                <ImageIcon size={20} />
              </div>
              <span className="text-[10px] text-slate-500 text-center leading-tight">{p.label}</span>
              <span className="text-[9px] text-slate-600 truncate w-full text-center">{p.name}</span>
            </div>
          ))}
          {/* Upload placeholder */}
          <div className="w-24 h-20 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-700 hover:border-sky-500/30 hover:text-sky-600 transition-colors cursor-pointer"
            onClick={() => onAdd(wsId, label)}>
            <Plus size={18} />
          </div>
        </div>
      ) : (
        <div onClick={() => onAdd(wsId, label)}
          className="border-2 border-dashed border-white/8 rounded-xl py-8 flex flex-col items-center gap-2 text-slate-600 hover:border-sky-500/30 hover:text-sky-500 transition-colors cursor-pointer">
          <ImagePlus size={24} />
          <p className="text-xs font-bold">คลิกเพื่อเพิ่มรูปภาพ</p>
          <p className="text-[11px] text-slate-700">รองรับ JPG, PNG — สูงสุด 10 รูป</p>
        </div>
      )}
    </div>
  );
}

function WorksheetTab() {
  const [sheets, setSheets] = useState(mockWorksheets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [cancelWs, setCancelWs] = useState<any>(null);

  const statuses = ["ทั้งหมด", "Open", "In Progress", "Closed", "Cancelled"];
  const filtered = sheets.filter(s =>
    (statusFilter === "ทั้งหมด" || s.status === statusFilter) &&
    (s.id.includes(search) || s.jobRef.includes(search) ||
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.tech.toLowerCase().includes(search.toLowerCase()) ||
      s.tid.includes(search))
  );

  const countByStatus = (st: string) => sheets.filter(s => s.status === st).length;

  const handleCreate = (ws: any) => {
    setSheets([ws, ...sheets]);
    setShowCreate(false);
  };

  const handleCancelConfirm = (id: string, reason: string) => {
    setSheets(sheets.map(s => s.id === id ? {
      ...s, status: "Cancelled", cancelReason: reason, closeDate: new Date().toISOString().slice(0, 16).replace("T", " "),
      log: [...s.log, { time: new Date().toTimeString().slice(0, 5), event: "ยกเลิกใบงาน", actor: "Admin" }],
    } : s));
    setCancelWs(null);
  };

  const handleToggleAutoClose = (id: string) => {
    setSheets(sheets.map(s => s.id === id ? { ...s, autoClose: !s.autoClose } : s));
  };

  const handleAddPhoto = (wsId: string, label: string) => {
    const photoId = `p${Date.now()}`;
    const idx = sheets.findIndex(s => s.id === wsId);
    const count = sheets[idx].photos.length + 1;
    setSheets(sheets.map(s => s.id === wsId ? {
      ...s,
      photos: [...s.photos, { id: photoId, name: `photo_${String(count).padStart(2, "0")}.jpg`, label, url: "" }],
      log: [...s.log, { time: new Date().toTimeString().slice(0, 5), event: `อัปโหลดรูป (${label})`, actor: "User" }],
    } : s));
  };

  const handleManualClose = (id: string) => {
    setSheets(sheets.map(s => s.id === id ? {
      ...s, status: "Closed", closeDate: new Date().toISOString().slice(0, 16).replace("T", " "),
      log: [...s.log, { time: new Date().toTimeString().slice(0, 5), event: "ปิดใบงาน (Manual)", actor: "Admin" }],
    } : s));
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {showCreate && <CreateWorksheetModal onClose={() => setShowCreate(false)} onSave={handleCreate} />}
      {cancelWs && <CancelWorksheetModal ws={cancelWs} onClose={() => setCancelWs(null)} onConfirm={handleCancelConfirm} />}

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Open", count: countByStatus("Open"), color: "sky" },
          { label: "In Progress", count: countByStatus("In Progress"), color: "blue" },
          { label: "Closed", count: countByStatus("Closed"), color: "emerald" },
          { label: "Cancelled", count: countByStatus("Cancelled"), color: "rose" },
        ].map(({ label, count, color }) => (
          <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
            <span className={`text-2xl font-black text-${color}-400`}>{count}</span>
            <span className={`text-xs font-bold text-${color}-400 leading-tight`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหา WST ID, Job Ref, ลูกค้า, ช่าง, TID..."
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-sky-500/50 transition-all">
          {statuses.map(s => <option key={s} className="bg-slate-900">{s}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors">
          <Download size={14} /> Export
        </button>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/30 hover:-translate-y-0.5 transition-all">
          <Plus size={14} /> สร้างใบงาน
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/8">
              {["WST ID", "Job Ref", "ลูกค้า / สาขา", "อุปกรณ์", "ช่าง", "เปิดเมื่อ", "ปิดเมื่อ", "รูป", "Auto", "สถานะ", ""].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(ws => (
              <React.Fragment key={ws.id}>
                <tr className={`hover:bg-white/4 transition-colors ${expandedId === ws.id ? "bg-white/4" : ""}`}>
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-sky-400">{ws.id}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-blue-400">{ws.jobRef}</td>
                  <td className="py-3.5 px-4">
                    <p className="text-xs font-bold text-slate-200">{ws.customer}</p>
                    <p className="text-[11px] text-slate-500">{ws.branch}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-xs text-slate-300">{ws.device}</p>
                    <p className="text-[11px] font-mono text-slate-500">{ws.tid}</p>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-300">{ws.tech}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{ws.openDate}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{ws.closeDate || <span className="text-slate-700">—</span>}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <ImageIcon size={12} className={ws.photos.length > 0 ? "text-sky-400" : "text-slate-700"} />
                      <span className={`text-xs font-bold ${ws.photos.length > 0 ? "text-sky-400" : "text-slate-600"}`}>{ws.photos.length}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-1.5">
                      <span title="Auto-Open" className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${ws.autoOpen ? "text-sky-400 bg-sky-500/10 border-sky-500/20" : "text-slate-600 bg-white/4 border-white/8"}`}>O</span>
                      <span title="Auto-Close" className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${ws.autoClose ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-slate-600 bg-white/4 border-white/8"}`}>C</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4"><WstBadge status={ws.status} /></td>
                  <td className="py-3.5 px-4">
                    <button onClick={() => setExpandedId(expandedId === ws.id ? null : ws.id)}
                      className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition-colors">
                      {expandedId === ws.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </td>
                </tr>

                {/* Expanded Detail */}
                {expandedId === ws.id && (
                  <tr className="bg-white/3 border-b border-white/8">
                    <td colSpan={11} className="px-6 py-5">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Col 1 — Photos */}
                        <div className="lg:col-span-2 space-y-3">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">รูปภาพประกอบ</p>
                          <PhotoUploadZone wsId={ws.id} photos={ws.photos} onAdd={handleAddPhoto} />
                        </div>

                        {/* Col 2 — Settings + Actions + Log */}
                        <div className="space-y-4">
                          {/* Settings */}
                          <div className="bg-white/4 border border-white/8 rounded-xl p-4 space-y-3">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">การตั้งค่าอัตโนมัติ</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Zap size={13} className={ws.autoOpen ? "text-sky-400" : "text-slate-600"} />
                                <div>
                                  <p className="text-xs font-bold text-slate-300">Auto-Open</p>
                                  <p className="text-[11px] text-slate-600">เปิดตาม Job OP</p>
                                </div>
                              </div>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${ws.autoOpen ? "text-sky-400 bg-sky-500/10 border-sky-500/20" : "text-slate-600 bg-white/4 border-white/8"}`}>
                                {ws.autoOpen ? "ON" : "OFF"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Zap size={13} className={ws.autoClose ? "text-emerald-400" : "text-slate-600"} />
                                <div>
                                  <p className="text-xs font-bold text-slate-300">Auto-Close</p>
                                  <p className="text-[11px] text-slate-600">ปิดตาม Job OP</p>
                                </div>
                              </div>
                              <button onClick={() => handleToggleAutoClose(ws.id)}
                                className={`relative w-10 h-5 rounded-full transition-colors ${ws.autoClose ? "bg-emerald-500" : "bg-white/10"}`}>
                                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${ws.autoClose ? "left-5" : "left-0.5"}`} />
                              </button>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">การดำเนินการ</p>
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-slate-400 font-bold text-xs rounded-xl hover:bg-white/8 transition-colors">
                              <Printer size={13} /> พิมพ์ใบงาน
                            </button>
                            {(ws.status === "Open" || ws.status === "In Progress") && !ws.autoClose && (
                              <button onClick={() => handleManualClose(ws.id)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold text-xs rounded-xl hover:bg-emerald-500/15 transition-colors">
                                <CheckCircle size={13} /> ปิดใบงาน (Manual)
                              </button>
                            )}
                            {ws.status !== "Closed" && ws.status !== "Cancelled" && (
                              <button onClick={() => setCancelWs(ws)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 border border-rose-500/25 text-rose-400 font-bold text-xs rounded-xl hover:bg-rose-500/15 transition-colors">
                                <Ban size={13} /> ยกเลิกใบงาน
                              </button>
                            )}
                            {ws.status === "Cancelled" && (
                              <div className="px-3 py-2.5 bg-rose-500/8 border border-rose-500/15 rounded-xl">
                                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">เหตุผลการยกเลิก</p>
                                <p className="text-xs text-rose-400 leading-relaxed">{ws.cancelReason}</p>
                              </div>
                            )}
                          </div>

                          {/* Activity Log */}
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><History size={11} /> Activity Log</p>
                            <div className="space-y-1.5 max-h-40 overflow-y-auto">
                              {[...ws.log].reverse().map((entry: any, i: number) => (
                                <div key={i} className="flex items-start gap-2.5">
                                  <span className="text-[10px] font-mono text-slate-600 whitespace-nowrap mt-0.5">{entry.time}</span>
                                  <div className="flex-1">
                                    <p className="text-[11px] text-slate-400 leading-tight">{entry.event}</p>
                                    <p className="text-[10px] text-slate-600">{entry.actor}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Workshop Tab ───────────────────────────────────────── */
function WsBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Received":      "bg-slate-500/15 text-slate-300 border-slate-500/25",
    "In Progress":   "bg-blue-500/15 text-blue-400 border-blue-500/25",
    "Waiting Parts": "bg-amber-500/15 text-amber-400 border-amber-500/25",
    "Completed":     "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    "Cancelled":     "bg-rose-500/15 text-rose-400 border-rose-500/25",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${map[status] || "bg-white/8 text-slate-400 border-white/10"}`}>{status}</span>;
}

function PostponeModal({ job, onClose, onSave }: { job: any; onClose: () => void; onSave: (id: string, date: string, reason: string) => void }) {
  const [newDate, setNewDate] = useState(job.convenientDate);
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <CalendarClock size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-white">เลื่อนวันนัดสะดวก</p>
              <p className="text-[11px] text-slate-500">{job.id} · {job.device}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition-colors"><X size={16} /></button>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-bold text-slate-400">วันเดิม</label>
              <div className="px-3 py-2.5 bg-white/5 border border-white/8 rounded-xl text-sm text-slate-500 flex items-center gap-2">
                <Calendar size={13} className="text-slate-600" />
                {job.convenientDate}
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-bold text-slate-400">วันใหม่ <span className="text-rose-400">*</span></label>
              <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-amber-500/30 text-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">เหตุผลการเลื่อน <span className="text-rose-400">*</span></label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="ระบุเหตุผล เช่น รอ Part จากซัพพลายเออร์, ลูกค้าขอเลื่อน..."
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm resize-none focus:outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/10 transition-all" />
          </div>
          {job.postponedCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-500/8 border border-amber-500/20 rounded-xl">
              <AlertCircle size={13} className="text-amber-400 shrink-0" />
              <p className="text-[11px] text-amber-400">งานนี้ถูกเลื่อนแล้ว <span className="font-black">{job.postponedCount}</span> ครั้ง</p>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors">ยกเลิก</button>
          <button onClick={() => reason && onSave(job.id, newDate, reason)} disabled={!reason || !newDate}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0">
            <CalendarClock size={14} /> บันทึกการเลื่อน
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteModal({ job, onClose, onSave }: { job: any; onClose: () => void; onSave: (id: string, note: string) => void }) {
  const [note, setNote] = useState(job.note);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-white">หมายเหตุ Workshop</p>
              <p className="text-[11px] text-slate-500">{job.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition-colors"><X size={16} /></button>
        </div>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={5} placeholder="บันทึกหมายเหตุ เช่น สถานะการซ่อม, อุปกรณ์ที่ใช้..."
          className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm resize-none focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all mb-5" />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 bg-white/8 border border-white/10 text-slate-300 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors">ยกเลิก</button>
          <button onClick={() => onSave(job.id, note)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-all">
            <Check size={14} /> บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkshopTab() {
  const [jobs, setJobs] = useState(mockWorkshopJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [postponeJob, setPostponeJob] = useState<any>(null);
  const [noteJob, setNoteJob] = useState<any>(null);

  const statuses = ["ทั้งหมด", "Received", "In Progress", "Waiting Parts", "Completed"];
  const filtered = jobs.filter(j =>
    (statusFilter === "ทั้งหมด" || j.status === statusFilter) &&
    (j.id.includes(search) || j.jobRef.includes(search) || j.customer.toLowerCase().includes(search.toLowerCase()) || j.device.toLowerCase().includes(search.toLowerCase()) || j.tid.includes(search))
  );

  const statusCount = (s: string) => jobs.filter(j => j.status === s).length;

  const handleChangeStatus = (id: string, status: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status } : j));
  };
  const handlePostponeSave = (id: string, date: string, reason: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, convenientDate: date, postponedCount: j.postponedCount + 1, note: j.note ? `${j.note}\n[เลื่อน ${date}] ${reason}` : `[เลื่อน ${date}] ${reason}` } : j));
    setPostponeJob(null);
  };
  const handleNoteSave = (id: string, note: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, note } : j));
    setNoteJob(null);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {postponeJob && <PostponeModal job={postponeJob} onClose={() => setPostponeJob(null)} onSave={handlePostponeSave} />}
      {noteJob && <NoteModal job={noteJob} onClose={() => setNoteJob(null)} onSave={handleNoteSave} />}

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "รับเข้า", count: statusCount("Received"), color: "slate" },
          { label: "กำลังซ่อม", count: statusCount("In Progress"), color: "blue" },
          { label: "รอ Part", count: statusCount("Waiting Parts"), color: "amber" },
          { label: "ซ่อมเสร็จ", count: statusCount("Completed"), color: "emerald" },
        ].map(({ label, count, color }) => (
          <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
            <span className={`text-2xl font-black text-${color}-400`}>{count}</span>
            <span className={`text-xs font-bold text-${color}-400 leading-tight`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหา WS ID, Job Ref, ลูกค้า, Device, TID..."
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all">
          {statuses.map(s => <option key={s} className="bg-slate-900">{s}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all">
          <Download size={14} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/8">
              {["WS ID", "Job Ref", "ลูกค้า / สาขา", "อุปกรณ์", "อาการ", "รับเข้า", "วันนัด", "สถานะ", ""].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(j => (
              <React.Fragment key={j.id}>
                <tr className={`hover:bg-white/4 transition-colors ${expandedId === j.id ? "bg-white/4" : ""}`}>
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-violet-400">{j.id}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-blue-400">{j.jobRef}</td>
                  <td className="py-3.5 px-4">
                    <p className="text-xs font-bold text-slate-200">{j.customer}</p>
                    <p className="text-[11px] text-slate-500">{j.branch}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-xs text-slate-300">{j.device}</p>
                    <p className="text-[11px] font-mono text-slate-500">{j.tid}</p>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 max-w-[160px] truncate">{j.symptom}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{j.receivedDate}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold ${j.postponedCount > 0 ? "text-amber-400" : "text-slate-300"}`}>{j.convenientDate}</span>
                      {j.postponedCount > 0 && (
                        <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-1">+{j.postponedCount}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4"><WsBadge status={j.status} /></td>
                  <td className="py-3.5 px-4">
                    <button onClick={() => setExpandedId(expandedId === j.id ? null : j.id)}
                      className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition-colors">
                      {expandedId === j.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedId === j.id && (
                  <tr className="bg-white/3 border-b border-white/8">
                    <td colSpan={9} className="px-6 py-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left — details */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">S/N</p>
                              <p className="font-mono text-xs text-slate-300">{j.sn}</p>
                            </div>
                            <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ช่างผู้รับผิดชอบ</p>
                              <p className="text-xs text-slate-300">{j.tech || "-"}</p>
                            </div>
                          </div>
                          <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">หมายเหตุ / บันทึกการซ่อม</p>
                            {j.note ? (
                              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{j.note}</p>
                            ) : (
                              <p className="text-xs text-slate-600 italic">ยังไม่มีหมายเหตุ</p>
                            )}
                          </div>

                          {/* Change Status */}
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">เปลี่ยนสถานะ</p>
                            <div className="flex gap-2 flex-wrap">
                              {["Received", "In Progress", "Waiting Parts", "Completed"].map(s => (
                                <button key={s} onClick={() => handleChangeStatus(j.id, s)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${j.status === s ? "bg-blue-600 text-white border-blue-500/50" : "bg-white/5 text-slate-400 border-white/8 hover:bg-white/10 hover:text-slate-300"}`}>
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right — actions */}
                        <div className="space-y-3">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">การดำเนินการ</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setPostponeJob(j)}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold text-sm rounded-xl hover:bg-amber-500/15 transition-colors">
                              <CalendarClock size={15} />
                              <span>เลื่อนวันนัด</span>
                            </button>
                            <button onClick={() => setNoteJob(j)}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 border border-blue-500/25 text-blue-400 font-bold text-sm rounded-xl hover:bg-blue-500/15 transition-colors">
                              <MessageSquare size={15} />
                              <span>เพิ่มหมายเหตุ</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-violet-500/10 border border-violet-500/25 text-violet-400 font-bold text-sm rounded-xl hover:bg-violet-500/15 transition-colors">
                              <Printer size={15} />
                              <span>พิมพ์ใบรับซ่อม</span>
                            </button>
                            <button className={`flex items-center justify-center gap-2 px-4 py-3 font-bold text-sm rounded-xl transition-colors border ${j.status === "Completed" ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/15" : "bg-white/4 border-white/8 text-slate-600 cursor-not-allowed"}`}
                              disabled={j.status !== "Completed"}>
                              <PackageCheck size={15} />
                              <span>ส่งคืนลูกค้า</span>
                            </button>
                          </div>

                          {j.postponedCount > 0 && (
                            <div className="mt-2 bg-amber-500/8 border border-amber-500/15 rounded-xl px-4 py-3">
                              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">ประวัติการเลื่อน</p>
                              <p className="text-xs text-amber-400">เลื่อนแล้ว <span className="font-black">{j.postponedCount}</span> ครั้ง</p>
                              {j.note && j.note.includes("[เลื่อน") && (
                                <p className="text-[11px] text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                                  {j.note.split("\n").filter((l: string) => l.startsWith("[เลื่อน")).join("\n")}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Reports Tab ────────────────────────────────────────── */
function StoreReportsTab() {
  const [reportType, setReportType] = useState("import-summary");
  const [dateFrom, setDateFrom] = useState("2026-03-01");
  const [dateTo, setDateTo] = useState("2026-03-16");
  const [bank, setBank] = useState("ทั้งหมด");
  const reports = [
    { key: "import-summary", label: "Import Summary", desc: "สรุปรายการ Import Order แยกตามธนาคาร" },
    { key: "stock-sim", label: "Stock SIM Report", desc: "รายงาน SIM ทั้งหมด แยกสถานะและผู้ให้บริการ" },
    { key: "stock-edc", label: "Stock EDC Report", desc: "รายงาน EDC แยก Bank / WBS / LOT" },
    { key: "branch-list", label: "Branch List", desc: "รายชื่อสาขา Location Code / Dummy" },
    { key: "service-fee", label: "Service Fee Report", desc: "รายงานค่าบริการ OS / SLIP (CRC, KTC, UOB)" },
    { key: "wbs-summary", label: "WBS Summary", desc: "สรุปค่าใช้จ่าย / รายได้ แยก WBS" },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {reports.map(r => (
          <button key={r.key} onClick={() => setReportType(r.key)} className={`text-left p-4 rounded-2xl border transition-all ${reportType === r.key ? "bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "bg-white/4 border-white/8 hover:bg-white/6"}`}>
            <p className={`text-sm font-bold mb-1 ${reportType === r.key ? "text-blue-400" : "text-slate-300"}`}>{r.label}</p>
            <p className="text-[11px] text-slate-500">{r.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-950/60 border border-white/8 rounded-2xl p-5 space-y-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ตัวกรอง</p>
        <div className="flex gap-3 flex-wrap">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">วันที่เริ่มต้น</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">วันที่สิ้นสุด</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">ธนาคาร</label>
            <select value={bank} onChange={e => setBank(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all">
              {["ทั้งหมด", "BBL", "KTC", "CRC", "UOB"].map(b => <option key={b} className="bg-slate-900">{b}</option>)}
            </select>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all">
          <Download size={15} /> Export เป็น Excel (.xlsx)
        </button>
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export function StoreView() {
  const [activeTab, setActiveTab] = useState("import-order");
  const tabs = [
    { key: "import-order", label: "Import Order", icon: <Upload size={14} /> },
    { key: "stock-sim", label: "Stock SIM", icon: <CreditCard size={14} /> },
    { key: "stock-edc", label: "Stock EDC", icon: <Monitor size={14} /> },
    { key: "shops", label: "Shop / ร้านค้า", icon: <Building2 size={14} /> },
    { key: "worksheet", label: "Worksheet", icon: <FileText size={14} /> },
    { key: "workshop", label: "Workshop", icon: <Wrench size={14} /> },
    { key: "reports", label: "รายงาน", icon: <BarChart2 size={14} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/95 border border-white/8 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Store size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Store Operations</h2>
            <p className="text-sm text-slate-400 mt-0.5">Import Order, สต็อก SIM/EDC, Worksheet, Workshop, ร้านค้า และรายงาน</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <div className="flex border-b border-white/8 px-4 bg-white/3 overflow-x-auto no-scrollbar">
          {tabs.map(t => <TabBtn key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)} icon={t.icon} label={t.label} />)}
        </div>
        <div className="p-6">
          {activeTab === "import-order" && <ImportOrderTab />}
          {activeTab === "stock-sim" && <StockSimTab />}
          {activeTab === "stock-edc" && <StockEdcTab />}
          {activeTab === "shops" && <ShopsTab />}
          {activeTab === "worksheet" && <WorksheetTab />}
          {activeTab === "workshop" && <WorkshopTab />}
          {activeTab === "reports" && <StoreReportsTab />}
        </div>
      </div>
    </div>
  );
}
