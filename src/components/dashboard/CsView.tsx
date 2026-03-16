"use client";

import React, { useState } from "react";
import {
  Headphones, Inbox, Package, RefreshCw, FileBarChart, PackageCheck,
  Search, Download, CheckCheck, Zap, AlertTriangle, Bug,
  Hash, Check, X, ChevronRight, AlertCircle, Clock
} from "lucide-react";

/* ─── Mock Data ─────────────────────────────────────────── */
const initialCsJobs = [
  { id: "JOB-2026-012", customer: "Bank Of Wealth", branch: "Asoke", type: "Install", deadline: "2026-03-16 17:00", priority: "Urgent", accepted: false },
  { id: "JOB-2026-013", customer: "Cafe Amazon", branch: "Ladprao", type: "Service", deadline: "2026-03-17 12:00", priority: "Normal", accepted: false },
  { id: "JOB-2026-014", customer: "Retail Corp", branch: "Central", type: "Install", deadline: "2026-03-17 09:00", priority: "Urgent", accepted: false },
  { id: "JOB-2026-015", customer: "7-Eleven", branch: "Asoke", type: "PM", deadline: "2026-03-18 10:00", priority: "Normal", accepted: false },
  { id: "JOB-2026-016", customer: "Lotus", branch: "Rama 9", type: "Reprogram", deadline: "2026-03-18 14:00", priority: "Normal", accepted: false },
  { id: "JOB-2026-017", customer: "Big C", branch: "Pattaya", type: "Install", deadline: "2026-03-19 09:00", priority: "Urgent", accepted: false },
];

const edcReceiveItems = [
  { tid: "TID-99882233", sn: "SN-AABBCCDD", model: "Verifone V200c", status: "Pending" },
  { tid: "TID-11223300", sn: "SN-PP1122QQ", model: "Ingenico iCT250", status: "Pending" },
  { tid: "TID-44556677", sn: "SN-RR3344SS", model: "PAX A920", status: "Pending" },
];

const mockPackingList = [
  { worksheetNo: "WS-4401", conNo: "", items: 2, customer: "Bank Of Wealth", branch: "Silom" },
  { worksheetNo: "WS-4402", conNo: "", items: 1, customer: "Cafe Amazon", branch: "Ladprao" },
  { worksheetNo: "WS-4403", conNo: "", items: 3, customer: "Retail Corp", branch: "Central" },
  { worksheetNo: "WS-4404", conNo: "", items: 1, customer: "7-Eleven", branch: "Sukhumvit" },
];

/* ─── Helpers ────────────────────────────────────────────── */
function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${active ? "border-blue-500 text-blue-400" : "border-transparent text-slate-600 hover:text-slate-400"}`}>
      {icon} {label}
    </button>
  );
}

/* ─── Take Job Tab ───────────────────────────────────────── */
function TakeJobTab() {
  const [jobs, setJobs] = useState(initialCsJobs);
  const [selected, setSelected] = useState<string[]>([]);
  const [autoSubmit, setAutoSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pending = jobs.filter(j => !j.accepted);
  const done = jobs.filter(j => j.accepted);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === pending.length ? [] : pending.map(j => j.id));

  const acceptSelected = () => {
    setJobs(jobs.map(j => selected.includes(j.id) ? { ...j, accepted: true } : j));
    setSelected([]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {submitted && (
        <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-sm animate-in fade-in duration-200">
          <CheckCheck size={18} /> รับงานเรียบร้อยแล้ว! ระบบส่งงานให้ช่างอัตโนมัติ
        </div>
      )}

      {/* Auto Submit toggle */}
      <div className="flex items-center justify-between p-4 bg-blue-500/8 border border-blue-500/20 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg shadow-[0_4px_12px_rgba(59,130,246,0.4)]"><Zap size={15} /></div>
          <div>
            <p className="text-sm font-bold text-white">Auto Submit</p>
            <p className="text-[11px] text-slate-500">รับงานอัตโนมัติทันทีที่เข้าระบบ ไม่ต้องกดทีละรายการ</p>
          </div>
        </div>
        <button onClick={() => setAutoSubmit(!autoSubmit)} className={`w-12 h-6 rounded-full p-1 relative transition-colors ${autoSubmit ? "bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.5)]" : "bg-white/10"}`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${autoSubmit ? "translate-x-6" : "translate-x-0"}`} />
        </button>
      </div>

      {/* Job list */}
      {pending.length > 0 && (
        <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-white/4 border-b border-white/8">
            <div className="flex items-center gap-3">
              <button onClick={toggleAll} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selected.length === pending.length ? "bg-blue-600 border-blue-500" : "border-white/20"}`}>
                {selected.length === pending.length && <Check size={11} className="text-white" />}
              </button>
              <span className="text-xs font-bold text-slate-400">รอรับงาน ({pending.length})</span>
            </div>
            {selected.length > 0 && (
              <button onClick={acceptSelected} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all">
                <CheckCheck size={14} /> รับงาน {selected.length} รายการ
              </button>
            )}
          </div>
          <div className="divide-y divide-white/5">
            {pending.map(j => (
              <div key={j.id} onClick={() => toggle(j.id)} className={`flex items-center gap-4 px-4 py-4 cursor-pointer transition-colors ${selected.includes(j.id) ? "bg-blue-500/8" : "hover:bg-white/4"}`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${selected.includes(j.id) ? "bg-blue-600 border-blue-500" : "border-white/20"}`}>
                  {selected.includes(j.id) && <Check size={11} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-400">{j.id}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${j.priority === "Urgent" ? "bg-rose-500/15 text-rose-400 border-rose-500/25" : "bg-slate-500/15 text-slate-400 border-slate-500/25"}`}>{j.priority}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200 truncate">{j.customer} — {j.branch}</p>
                  <p className="text-xs text-slate-500">{j.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                    <Clock size={11} /> {j.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accepted */}
      {done.length > 0 && (
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">รับงานแล้ว ({done.length})</p>
          <div className="space-y-2">
            {done.map(j => (
              <div key={j.id} className="flex items-center gap-4 px-4 py-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-emerald-400">{j.id}</span>
                <span className="text-xs text-slate-400">{j.customer} — {j.branch} ({j.type})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {pending.length === 0 && done.length === 0 && (
        <div className="py-12 text-center text-slate-600"><Inbox size={32} className="mx-auto mb-2 opacity-30" /><p className="text-sm">ไม่มีงานรอรับ</p></div>
      )}
    </div>
  );
}

/* ─── Receive EDC Tab ────────────────────────────────────── */
function ReceiveEdcTab() {
  const [jobNo, setJobNo] = useState("");
  const [searched, setSearched] = useState(false);
  const [items, setItems] = useState(edcReceiveItems.map(i => ({ ...i, checked: false })));
  const [submitted, setSubmitted] = useState(false);

  const checkedCount = items.filter(i => i.checked).length;
  const handleSearch = () => { if (jobNo) setSearched(true); };
  const handleSubmit = () => {
    setItems(items.map(i => i.checked ? { ...i, status: "Received" } : i));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 max-w-2xl">
      {submitted && (
        <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-sm animate-in fade-in duration-200">
          <CheckCheck size={18} /> รับ EDC / Peripheral เรียบร้อยแล้ว!
        </div>
      )}

      {/* Search */}
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">ระบุเลขที่ใบงาน</p>
        <div className="flex gap-3">
          <input value={jobNo} onChange={e => setJobNo(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} placeholder="JOB-2026-XXX หรือ WS-XXXX" className="flex-1 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all font-mono" />
          <button onClick={handleSearch} className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all border border-blue-500/30">
            <Search size={15} /> ค้นหา
          </button>
        </div>
      </div>

      {searched && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-white/4 border-b border-white/8">
              <p className="text-xs font-black text-slate-400">รายการอุปกรณ์ใน {jobNo || "JOB-2026-012"}</p>
            </div>
            <div className="divide-y divide-white/5">
              {items.map((item, i) => (
                <div key={i} onClick={() => setItems(items.map((it, idx) => idx === i ? { ...it, checked: !it.checked } : it))}
                  className={`flex items-center gap-4 px-4 py-4 cursor-pointer transition-colors ${item.checked ? "bg-blue-500/8" : "hover:bg-white/4"}`}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${item.checked ? "bg-blue-600 border-blue-500" : "border-white/20"}`}>
                    {item.checked && <Check size={11} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-200">{item.model}</p>
                    <div className="flex gap-4 mt-0.5">
                      <span className="text-[10px] text-slate-500 font-mono">TID: {item.tid}</span>
                      <span className="text-[10px] text-slate-500 font-mono">S/N: {item.sn}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.status === "Received" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" : "bg-amber-500/15 text-amber-400 border-amber-500/25"}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">เลือก {checkedCount} / {items.length} รายการ</p>
            <button onClick={handleSubmit} disabled={checkedCount === 0} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              <CheckCheck size={15} /> Submit รับ {checkedCount} รายการ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Change S/N Tab ─────────────────────────────────────── */
function ChangeSnTab() {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState(false);
  const [newSn, setNewSn] = useState("");
  const [saved, setSaved] = useState(false);
  const [currentSn, setCurrentSn] = useState("SN-AABBCCDD");

  const handleSearch = () => { if (query) setFound(true); };
  const handleSave = () => {
    setCurrentSn(newSn);
    setSaved(true);
    setNewSn("");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 max-w-xl">
      {saved && (
        <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-sm animate-in fade-in duration-200">
          <Check size={18} /> เปลี่ยน S/N เรียบร้อยแล้ว! DB อัปเดตแล้ว
        </div>
      )}

      {/* Info note */}
      <div className="flex items-start gap-3 p-4 bg-amber-500/8 border border-amber-500/20 rounded-2xl">
        <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-400/80 leading-relaxed">หากอุปกรณ์ไม่ได้เปลี่ยน S/N ใน DB ต้องคงเป็น S/N เดิม — ใช้ฟังก์ชันนี้เฉพาะกรณีที่ร้านแจ้งแก้ไข S/N และยังไม่ได้เปิดงาน หรือเมื่อ S/N ไม่ตรงกับระบบ</p>
      </div>

      {/* Search */}
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">ค้นหาด้วย TID หรือ เลขใบงาน</p>
        <div className="flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} placeholder="TID-XXXXXXXX หรือ JOB-2026-XXX" className="flex-1 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all font-mono" />
          <button onClick={handleSearch} className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all border border-blue-500/30">
            <Search size={15} /> ค้นหา
          </button>
        </div>
      </div>

      {found && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Result card */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5 space-y-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ข้อมูลปัจจุบัน</p>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-[10px] text-slate-500 font-bold mb-1">TID</p><p className="font-mono font-bold text-blue-400 text-sm">TID-99882233</p></div>
              <div><p className="text-[10px] text-slate-500 font-bold mb-1">Job No.</p><p className="font-mono font-bold text-slate-300 text-sm">JOB-2026-001</p></div>
              <div><p className="text-[10px] text-slate-500 font-bold mb-1">ลูกค้า</p><p className="text-sm text-slate-300 font-semibold">Bank Of Wealth — Silom</p></div>
              <div><p className="text-[10px] text-slate-500 font-bold mb-1">S/N ปัจจุบัน (DB)</p><p className="font-mono font-bold text-amber-400 text-sm">{currentSn}</p></div>
            </div>
          </div>

          {/* New S/N input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400">S/N ใหม่</label>
            <input value={newSn} onChange={e => setNewSn(e.target.value)} placeholder="กรอก Serial Number ใหม่" className="w-full bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm font-mono font-bold focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setFound(false); setQuery(""); setNewSn(""); }} className="flex items-center gap-2 px-4 py-2.5 bg-white/8 border border-white/10 text-slate-400 font-bold text-sm rounded-xl hover:bg-white/12 transition-colors">
              ยกเลิก
            </button>
            <button onClick={handleSave} disabled={!newSn} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all border border-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed">
              <Check size={15} /> บันทึก S/N ใหม่
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CS Reports Tab ─────────────────────────────────────── */
function CsReportsTab() {
  const [dateFrom, setDateFrom] = useState("2026-03-01");
  const [dateTo, setDateTo] = useState("2026-03-16");

  const sections = [
    { key: "receive", label: "Report Receive", desc: "รายงานการรับ EDC / Peripheral", columns: ["วัน/เดือน/ปี (Store Front)", "อาการ (Symptom)", "ผู้คืน (Returner)", "TID", "S/N", "Ref No."], hasNote: true },
    { key: "send", label: "Report Send Machine", desc: "รายงานการส่งเครื่อง Onsite", columns: ["วันที่เปิดงาน", "เวลาเปิดงาน", "Issue / ปัญหา", "TID", "ลูกค้า", "สาขา"] },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Export Bug Note */}
      <div className="flex items-start gap-3 p-4 bg-rose-500/8 border border-rose-500/20 rounded-2xl">
        <Bug size={16} className="text-rose-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-black text-rose-400 mb-0.5">Bug Fix Note — Export File</p>
          <p className="text-xs text-rose-400/70">ปุ่ม Export ใน Store Front / Store Back แสดงผลแต่ไม่มีข้อมูล — ต้องแก้ให้ Export ดึงข้อมูลจริง พร้อมเพิ่มคอลัมน์ที่ขาดหายไป</p>
        </div>
      </div>

      {/* Date filter */}
      <div className="flex gap-3 flex-wrap items-end">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400">วันที่เริ่มต้น</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400">วันที่สิ้นสุด</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all" />
        </div>
      </div>

      {sections.map(s => (
        <div key={s.key} className="bg-slate-950/60 border border-white/8 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 bg-white/4 border-b border-white/8">
            <div>
              <p className="text-sm font-black text-white">{s.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all">
              <Download size={13} /> Export Excel
            </button>
          </div>
          <div className="p-5">
            {s.hasNote && (
              <div className="mb-4 flex items-start gap-2 p-3 bg-amber-500/8 border border-amber-500/15 rounded-xl">
                <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-400/80">คอลัมน์ที่เพิ่มใหม่: วัน/เดือน/ปี, อาการ, ผู้คืน — ยังไม่แสดงใน Report เดิม</p>
              </div>
            )}
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">คอลัมน์ในรายงาน</p>
            <div className="flex flex-wrap gap-2">
              {s.columns.map(c => (
                <span key={c} className="text-[11px] px-2.5 py-1 bg-white/6 border border-white/8 text-slate-400 rounded-lg font-medium">{c}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Packing Tab ────────────────────────────────────────── */
function PackingTab() {
  const [list, setList] = useState(mockPackingList);
  const [saved, setSaved] = useState(false);
  const updateCon = (i: number, val: string) => setList(list.map((l, idx) => idx === i ? { ...l, conNo: val } : l));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };
  const allFilled = list.every(l => l.conNo.trim() !== "");

  return (
    <div className="space-y-4 animate-in fade-in duration-300 max-w-2xl">
      {saved && (
        <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-sm animate-in fade-in duration-200">
          <Check size={18} /> บันทึก Con Number เรียบร้อยแล้ว!
        </div>
      )}

      <div className="flex items-center gap-3 p-4 bg-blue-500/8 border border-blue-500/20 rounded-2xl">
        <Hash size={16} className="text-blue-400" />
        <p className="text-xs text-blue-400/80 font-medium">กรอก Con Number สำหรับแต่ละ Worksheet แล้ว Export เพื่อนำไปแนบใน Worksheet Report</p>
      </div>

      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/8">
              {["Worksheet No.", "ลูกค้า / สาขา", "จำนวนชิ้น", "Con Number"].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {list.map((l, i) => (
              <tr key={l.worksheetNo} className="hover:bg-white/3 transition-colors">
                <td className="py-3.5 px-4 font-mono text-xs font-bold text-blue-400">{l.worksheetNo}</td>
                <td className="py-3.5 px-4 text-xs text-slate-300">{l.customer} — {l.branch}</td>
                <td className="py-3.5 px-4 text-xs text-slate-400 text-center">{l.items}</td>
                <td className="py-2 px-3">
                  <input value={l.conNo} onChange={e => updateCon(i, e.target.value)} placeholder="กรอก Con No..." className="w-full bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-600 rounded-lg px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={handleSave} disabled={!allFilled} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all border border-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed">
          <Check size={15} /> บันทึก
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all">
          <Download size={15} /> Export ทั้งหมด
        </button>
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export function CsView() {
  const [activeTab, setActiveTab] = useState("take");
  const tabs = [
    { key: "take", label: "รับงาน Take", icon: <Inbox size={14} /> },
    { key: "edc", label: "รับ EDC / Peripheral", icon: <Package size={14} /> },
    { key: "change-sn", label: "เปลี่ยน S/N", icon: <RefreshCw size={14} /> },
    { key: "reports", label: "รายงาน", icon: <FileBarChart size={14} /> },
    { key: "packing", label: "Packing / Con No.", icon: <PackageCheck size={14} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/95 border border-white/8 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <Headphones size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Customer Service (CS)</h2>
            <p className="text-sm text-slate-400 mt-0.5">รับงาน, รับ EDC, เปลี่ยน S/N, รายงาน และ Packing</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <div className="flex border-b border-white/8 px-4 bg-white/3 overflow-x-auto no-scrollbar">
          {tabs.map(t => <TabBtn key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)} icon={t.icon} label={t.label} />)}
        </div>
        <div className="p-6">
          {activeTab === "take" && <TakeJobTab />}
          {activeTab === "edc" && <ReceiveEdcTab />}
          {activeTab === "change-sn" && <ChangeSnTab />}
          {activeTab === "reports" && <CsReportsTab />}
          {activeTab === "packing" && <PackingTab />}
        </div>
      </div>
    </div>
  );
}
