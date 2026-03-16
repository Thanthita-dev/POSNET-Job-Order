"use client";

import React, { useState } from "react";
import {
  PhoneCall, ClipboardList, FilePlus2, BookOpen, AlertTriangle,
  Search, Filter, ChevronDown, CheckCircle, Clock, Phone,
  Copy, Send, Lightbulb, X, Check, Plus, Minus, RefreshCw
} from "lucide-react";

/* ─── Mock Data ─────────────────────────────────────────── */
const mockCallReports = [
  { id: "HDC-2026-001", datetime: "2026-03-16 09:22", worksheetNo: "WS-4401", customer: "Bank Of Wealth", symptom: "Battery is low", device: "Verifone V200c", status: "Pending Onsite", openedBy: "Somchai K." },
  { id: "HDC-2026-002", datetime: "2026-03-16 10:05", worksheetNo: "WS-4402", customer: "Cafe Amazon", symptom: "หน้าจอค้าง / Freeze", device: "Ingenico iCT250", status: "Open", openedBy: null },
  { id: "HDC-2026-003", datetime: "2026-03-15 14:30", worksheetNo: "WS-4398", customer: "Retail Corp", symptom: "กระดาษติด / Printer jammed", device: "PAX A920", status: "Closed", openedBy: "Wichai T." },
  { id: "HDC-2026-004", datetime: "2026-03-15 11:00", worksheetNo: "WS-4395", customer: "7-Eleven", symptom: "รูด Card ไม่ได้ / Card Reader Error", device: "Verifone V240m", status: "In Progress", openedBy: "Nattawut P." },
  { id: "HDC-2026-005", datetime: "2026-03-14 16:45", worksheetNo: "WS-4390", customer: "Lotus", symptom: "SIM ไม่ติดเครือข่าย", device: "PAX A930", status: "Closed", openedBy: "Kittipong S." },
  { id: "HDC-2026-006", datetime: "2026-03-14 09:10", worksheetNo: "WS-4388", customer: "Big C", symptom: "Battery is low", device: "Verifone V200c", status: "Closed", openedBy: "Somchai K." },
  { id: "HDC-2026-007", datetime: "2026-03-13 13:30", worksheetNo: "WS-4382", customer: "Bank Of Wealth", symptom: "Transaction ค้าง", device: "Ingenico iWL252", status: "In Progress", openedBy: null },
];

const symptomDeviceMap = [
  { keyword: "battery", label: "Battery is low", devices: ["Battery Pack Model X", "AC Adapter 5V 2A", "Power Cable USB-C"] },
  { keyword: "screen", label: "หน้าจอ / Screen", devices: ["Touch Screen Panel A4", "Display Ribbon Cable"] },
  { keyword: "printer", label: "Printer / กระดาษ", devices: ["Thermal Printer Roller", "Printer Head Unit", "Paper Guide"] },
  { keyword: "card", label: "Card Reader", devices: ["Magnetic Stripe Reader", "EMV Card Reader Module", "Contactless NFC Module"] },
  { keyword: "sim", label: "SIM", devices: ["SIM Card 4G (AIS)", "SIM Card 4G (DTAC)", "SIM Card Tray"] },
  { keyword: "transaction", label: "Transaction / โปรแกรม", devices: ["USB Service Cable", "Programming Jig"] },
];

const kbArticles = [
  { id: "KB-001", category: "EDC", title: "แก้ปัญหา Battery is low", tags: ["battery", "power", "adapter"], summary: "ตรวจสอบอแดปเตอร์และแบตเตอรี่ หากขึ้น Battery is low ให้เปลี่ยนแบตเตอรี่และทดสอบชาร์จด้วย Adapter ใหม่ก่อน", steps: ["ถอดแบตเตอรี่ออก 30 วินาที", "ใส่แบตเตอรี่ใหม่และต่อ Adapter", "เปิดเครื่องและรอ Boot", "ทดสอบ Transaction 1 รายการ"] },
  { id: "KB-002", category: "EDC", title: "หน้าจอค้าง / Freeze", tags: ["screen", "freeze", "reboot"], summary: "ทำ Hard Reset โดยกด Power + ปุ่มดาว ค้าง 10 วินาที จากนั้นอัปเดต Firmware", steps: ["กด Power + Star ค้าง 10 วิ", "รอ Reboot อัตโนมัติ", "เข้า Admin Menu > Update FW", "ทดสอบการทำงาน"] },
  { id: "KB-003", category: "Peripheral", title: "กระดาษติดในเครื่องพิมพ์", tags: ["printer", "paper jam", "roller"], summary: "เปิดฝากระดาษ ดึงกระดาษออก ทำความสะอาด Roller ด้วยแอลกอฮอล์", steps: ["เปิดฝา Paper Compartment", "ดึงกระดาษออกให้หมด", "เช็ด Roller ด้วย IPA 70%", "ใส่กระดาษใหม่และทดสอบ Feed"] },
  { id: "KB-004", category: "EDC", title: "Card Reader Error / รูดไม่ผ่าน", tags: ["card", "reader", "EMV"], summary: "ทำความสะอาดหัวอ่าน Magnetic Stripe ด้วย Cleaning Card หากยังไม่ได้ให้เปลี่ยน Card Reader Module", steps: ["สั่ง Clean ด้วย Cleaning Card 3 รอบ", "ทดสอบรูด Card อีกครั้ง", "หากยังไม่ได้ให้เปิด Onsite เปลี่ยน Reader"] },
  { id: "KB-005", category: "SIM", title: "SIM ไม่ติดเครือข่าย", tags: ["sim", "network", "APN"], summary: "ตรวจสอบ APN Setting และ ICCID ว่าตรงกับ SIM ที่ใส่ ลอง Restart Modem ใน Admin Menu", steps: ["Admin Menu > Network > SIM Status", "ตรวจสอบ APN: internet (AIS) / mobiledata (DTAC)", "Restart Modem และรอ 60 วิ", "หากยังไม่ได้ให้เปลี่ยน SIM"] },
  { id: "KB-006", category: "Software", title: "Transaction ค้าง / Host Timeout", tags: ["transaction", "host", "timeout"], summary: "ตรวจสอบ Network ก่อน หากสัญญาณดีให้ตรวจสอบ Host Parameter และลอง Reprogram", steps: ["ทดสอบ Ping Host", "Admin > Host > Check Parameter", "Void Transaction ที่ค้าง", "ทดสอบ Transaction ใหม่"] },
];

const customers = ["Bank Of Wealth", "Retail Corp", "Cafe Amazon", "7-Eleven", "Lotus", "Big C"];

/* ─── Status Badge ──────────────────────────────────────── */
function CallStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Open": "bg-blue-500/15 text-blue-400 border-blue-500/25",
    "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/25",
    "Pending Onsite": "bg-violet-500/15 text-violet-400 border-violet-500/25",
    "Closed": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${map[status] || "bg-white/8 text-slate-400 border-white/10"}`}>
      {status}
    </span>
  );
}

/* ─── Tab Button ─────────────────────────────────────────── */
function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${active ? "border-blue-500 text-blue-400" : "border-transparent text-slate-600 hover:text-slate-400"}`}>
      {icon} {label}
    </button>
  );
}

/* ─── Call Report Tab ────────────────────────────────────── */
function CallReportTab() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const filtered = mockCallReports.filter(r =>
    (statusFilter === "ทั้งหมด" || r.status === statusFilter) &&
    (r.id.toLowerCase().includes(search.toLowerCase()) || r.symptom.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Filter bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหา ID, อาการ, ลูกค้า..." className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all">
          {["ทั้งหมด", "Open", "In Progress", "Pending Onsite", "Closed"].map(s => <option key={s} className="bg-slate-900">{s}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all">
          <RefreshCw size={14} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/8">
              {["HDC ID", "วัน/เวลาที่รับ", "Worksheet#", "ลูกค้า", "อาการ", "อุปกรณ์", "สถานะ", "ผู้เปิด Onsite"].map(h => (
                <th key={h} className="py-3 px-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-white/4 transition-colors">
                <td className="py-3.5 px-4 font-bold text-blue-400 text-xs">{r.id}</td>
                <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">{r.datetime}</td>
                <td className="py-3.5 px-4 font-mono text-slate-300 text-xs">{r.worksheetNo}</td>
                <td className="py-3.5 px-4 text-slate-300 text-xs">{r.customer}</td>
                <td className="py-3.5 px-4 text-slate-300 text-xs max-w-[160px] truncate">{r.symptom}</td>
                <td className="py-3.5 px-4 text-slate-400 text-xs">{r.device}</td>
                <td className="py-3.5 px-4"><CallStatusBadge status={r.status} /></td>
                <td className="py-3.5 px-4 text-xs text-slate-400">{r.openedBy ?? <span className="text-slate-600">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-600"><PhoneCall size={32} className="mx-auto mb-2 opacity-30" /><p className="text-sm">ไม่พบข้อมูล</p></div>
        )}
      </div>
      <p className="text-[11px] text-slate-600 text-right">แสดง {filtered.length} / {mockCallReports.length} รายการ</p>
    </div>
  );
}

/* ─── Open Onsite Tab ────────────────────────────────────── */
function OpenOnsiteTab() {
  const [customer, setCustomer] = useState("");
  const [branch, setBranch] = useState("");
  const [symptom, setSymptom] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const suggestedMap = symptomDeviceMap.filter(m => symptom.toLowerCase().includes(m.keyword));
  const suggestedDevices = suggestedMap.flatMap(m => m.devices);

  // Duplicate detection: "Battery is low" appears twice this month
  const isDuplicate = symptom.toLowerCase().includes("battery") && customer === "Big C";

  const toggleDevice = (device: string) => {
    setSelectedDevices(prev => {
      const next = { ...prev };
      if (next[device]) delete next[device]; else next[device] = 1;
      return next;
    });
  };
  const changeQty = (device: string, delta: number) => {
    setSelectedDevices(prev => {
      const qty = Math.max(1, (prev[device] || 1) + delta);
      return { ...prev, [device]: qty };
    });
  };

  const handleSubmit = () => { setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 max-w-4xl">
      {submitted && (
        <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold text-sm animate-in fade-in duration-200">
          <CheckCircle size={18} /> เปิดงาน Onsite เรียบร้อยแล้ว! ระบบส่งงานให้ช่างอัตโนมัติ
        </div>
      )}

      {/* Duplicate Alert */}
      {isDuplicate && (
        <div className="flex items-start gap-3 px-5 py-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-sm animate-in fade-in duration-200">
          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-black text-amber-400">พบงานซ้ำภายในเดือน!</p>
            <p className="text-amber-400/70 text-xs mt-0.5">Big C มีงานอาการ Battery is low ที่ปิดแล้วในเดือนนี้ (HDC-2026-006) — ต้องขออนุมัติจาก Head ก่อนเปิดงานใหม่</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">ข้อมูลการเรียก</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">ลูกค้า</label>
              <select value={customer} onChange={e => setCustomer(e.target.value)} className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none">
                <option value="">-- เลือกลูกค้า --</option>
                {customers.map(c => <option key={c} className="bg-slate-900">{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">สาขา</label>
              <input value={branch} onChange={e => setBranch(e.target.value)} placeholder="ระบุสาขา" className="w-full bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">อาการเสีย / Symptom</label>
            <textarea value={symptom} onChange={e => setSymptom(e.target.value)} rows={3} placeholder="ระบุอาการที่ร้านแจ้ง เช่น Battery is low, หน้าจอค้าง..." className="w-full bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none resize-none" />
          </div>

          {/* Auto-suggest label */}
          {suggestedMap.length > 0 && (
            <div className="flex items-start gap-2 p-3 bg-blue-500/8 border border-blue-500/20 rounded-xl">
              <Lightbulb size={14} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">อุปกรณ์แนะนำสำหรับอาการนี้</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedMap.map(m => (
                    <span key={m.keyword} className="text-[10px] px-2 py-0.5 bg-blue-500/15 text-blue-300 rounded-full border border-blue-500/20 font-semibold">{m.label}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button onClick={handleSubmit} disabled={!customer || !symptom || Object.keys(selectedDevices).length === 0} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-black rounded-xl shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm border border-blue-500/30">
            <Send size={15} /> เปิดงาน Onsite
          </button>
        </div>

        {/* Right: Device selection */}
        <div>
          <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3">เลือกอุปกรณ์ที่ต้องใช้</h4>
          <div className="bg-slate-950/60 rounded-2xl border border-white/8 overflow-hidden">
            {(suggestedDevices.length > 0 ? suggestedDevices : symptomDeviceMap.flatMap(m => m.devices.slice(0, 1))).map((device, i) => {
              const isSelected = !!selectedDevices[device];
              return (
                <div key={i} className={`flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 transition-colors ${isSelected ? "bg-blue-500/8" : "hover:bg-white/4"}`}>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleDevice(device)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${isSelected ? "bg-blue-600 border-blue-500" : "border-white/20 hover:border-white/40"}`}>
                      {isSelected && <Check size={11} className="text-white" />}
                    </button>
                    <span className="text-sm text-slate-300 font-medium">{device}</span>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(device, -1)} className="w-6 h-6 rounded-lg bg-white/8 hover:bg-white/12 flex items-center justify-center text-slate-400"><Minus size={12} /></button>
                      <span className="text-sm font-bold text-white w-4 text-center">{selectedDevices[device]}</span>
                      <button onClick={() => changeQty(device, 1)} className="w-6 h-6 rounded-lg bg-white/8 hover:bg-white/12 flex items-center justify-center text-slate-400"><Plus size={12} /></button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {Object.keys(selectedDevices).length > 0 && (
            <div className="mt-3 p-3 bg-white/4 border border-white/8 rounded-xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">สรุปอุปกรณ์ที่เลือก</p>
              {Object.entries(selectedDevices).map(([d, qty]) => (
                <div key={d} className="flex justify-between text-xs text-slate-300 py-1 border-b border-white/5 last:border-0">
                  <span>{d}</span><span className="font-bold text-blue-400">x{qty}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Knowledge Center Tab ───────────────────────────────── */
function KnowledgeCenterTab() {
  const [catFilter, setCatFilter] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const cats = ["ทั้งหมด", "EDC", "SIM", "Peripheral", "Software"];
  const filtered = kbArticles.filter(a =>
    (catFilter === "ทั้งหมด" || a.category === catFilter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.includes(search.toLowerCase())))
  );

  const catColor: Record<string, string> = {
    EDC: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    SIM: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    Peripheral: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    Software: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหา..." className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all" />
        </div>
        <div className="flex gap-2">
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${catFilter === c ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-slate-950/60 border border-white/8 rounded-2xl overflow-hidden hover:border-white/14 transition-colors">
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${catColor[a.category]}`}>{a.category}</span>
                  <h3 className="font-bold text-white text-sm mt-2">{a.title}</h3>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{a.summary}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {a.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 text-slate-500 rounded-full border border-white/8">{t}</span>)}
              </div>
              <button onClick={() => setExpanded(expanded === a.id ? null : a.id)} className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors">
                {expanded === a.id ? "ซ่อน" : "ดูขั้นตอน →"}
              </button>
            </div>
            {expanded === a.id && (
              <div className="px-5 pb-5 border-t border-white/6 pt-4 animate-in slide-in-from-top-2 duration-200">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">ขั้นตอนการแก้ไข</p>
                <ol className="space-y-2">
                  {a.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────── */
export function HdCallView() {
  const [activeTab, setActiveTab] = useState("call-report");
  const tabs = [
    { key: "call-report", label: "Call Report", icon: <ClipboardList size={14} /> },
    { key: "open-onsite", label: "เปิดงาน Onsite", icon: <FilePlus2 size={14} /> },
    { key: "knowledge", label: "Knowledge Center", icon: <BookOpen size={14} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/95 border border-white/8 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <PhoneCall size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">HD Call Center</h2>
            <p className="text-sm text-slate-400 mt-0.5">บันทึกการรับสาย เปิดงาน Onsite และฐานความรู้</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-sm">
        <div className="flex border-b border-white/8 px-4 bg-white/3 overflow-x-auto no-scrollbar">
          {tabs.map(t => <TabBtn key={t.key} active={activeTab === t.key} onClick={() => setActiveTab(t.key)} icon={t.icon} label={t.label} />)}
        </div>
        <div className="p-6">
          {activeTab === "call-report" && <CallReportTab />}
          {activeTab === "open-onsite" && <OpenOnsiteTab />}
          {activeTab === "knowledge" && <KnowledgeCenterTab />}
        </div>
      </div>
    </div>
  );
}
