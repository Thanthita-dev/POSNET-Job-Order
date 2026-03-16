"use client";

import React, { useState, useRef } from "react";
import {
  Upload, FileSpreadsheet, CheckCircle, AlertTriangle, X, ChevronRight,
  ChevronDown, Search, Edit2, Save, RotateCcw, Download, Eye,
  Plus, Trash2, Check, CreditCard, Cpu, Building2, Tag,
  AlertCircle, Info, ArrowRight, RefreshCw, Filter, History,
  Clock, FileCheck2, XCircle, ChevronLeft
} from "lucide-react";

/* ─── Constants ─────────────────────────────────────────── */
const BANKS = [
  { id: "BBL",   label: "BBL",   color: "bg-blue-600",   text: "text-blue-600",   bg: "bg-blue-50",    border: "border-blue-300",   darkText: "text-blue-400",   darkBg: "bg-blue-500/15",   darkBorder: "border-blue-500/40" },
  { id: "KTC",   label: "KTC",   color: "bg-rose-600",   text: "text-rose-600",   bg: "bg-rose-50",    border: "border-rose-300",   darkText: "text-rose-400",   darkBg: "bg-rose-500/15",   darkBorder: "border-rose-500/40" },
  { id: "CRC",   label: "CRC",   color: "bg-amber-600",  text: "text-amber-600",  bg: "bg-amber-50",   border: "border-amber-300",  darkText: "text-amber-400",  darkBg: "bg-amber-500/15",  darkBorder: "border-amber-500/40" },
  { id: "UOB",   label: "UOB",   color: "bg-violet-600", text: "text-violet-600", bg: "bg-violet-50",  border: "border-violet-300", darkText: "text-violet-400", darkBg: "bg-violet-500/15", darkBorder: "border-violet-500/40" },
  { id: "SCB",   label: "SCB",   color: "bg-purple-600", text: "text-purple-600", bg: "bg-purple-50",  border: "border-purple-300", darkText: "text-purple-400", darkBg: "bg-purple-500/15", darkBorder: "border-purple-500/40" },
  { id: "KBANK", label: "KBANK", color: "bg-green-600",  text: "text-green-600",  bg: "bg-green-50",   border: "border-green-300",  darkText: "text-green-400",  darkBg: "bg-green-500/15",  darkBorder: "border-green-500/40" },
  { id: "BAY",   label: "BAY",   color: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50",  border: "border-yellow-300", darkText: "text-yellow-400", darkBg: "bg-yellow-500/15", darkBorder: "border-yellow-500/40" },
  { id: "OTHER", label: "Other", color: "bg-slate-500",  text: "text-slate-600",  bg: "bg-slate-100",  border: "border-slate-300",  darkText: "text-slate-400",  darkBg: "bg-slate-500/15",  darkBorder: "border-slate-500/40" },
];

const JOB_TYPES = [
  { id: "INS",    label: "Install",    icon: "📦" },
  { id: "RE",     label: "Re-install", icon: "🔄" },
  { id: "MOVE",   label: "Move",       icon: "🚚" },
  { id: "DEINS",  label: "De-install", icon: "📤" },
  { id: "SERV",   label: "Service",    icon: "🔧" },
  { id: "PM",     label: "PM",         icon: "🛠️" },
  { id: "REPROG", label: "Reprogram",  icon: "💻" },
];

const PARTITIONS = ["P1","P2","P3","P4","P5","P6","MAIN","MULTI"];
const EDC_MODELS = ["Verifone V200c","Verifone VX520","Ingenico iCT250","PAX A920","PAX A30","PAX S300"];

/* ─── Mock Data ──────────────────────────────────────────── */
const generateMockRows = (bank: string) => [
  { id: 1, tid: "T0001234", merchantName: "THAI COFFEE ร้านกาแฟไทย", merchantNameEn: "THAI COFFEE", address: "123 ถ.สุขุมวิท", subDistrict: "คลองตัน", district: "คลองเตย", province: "กรุงเทพ", installment: bank === "BBL" ? "" : "3,6,12", planDate: "2026-03-22", status: "valid", errors: bank === "BBL" ? ["ชื่อไทย/อังกฤษสลับกัน","Installment ว่าง","ตำบลไม่เข้า"] : [] },
  { id: 2, tid: "T0001235", merchantName: "LOTUS EXPRESS โลตัส", merchantNameEn: "LOTUS EXPRESS", address: "456 ถ.พระราม9", subDistrict: "บางกะปิ", district: "ห้วยขวาง", province: "กรุงเทพ", installment: "3,6,10", planDate: "2026-03-23", status: "valid", errors: [] },
  { id: 3, tid: "T0001236", merchantName: "", merchantNameEn: "CENTRAL WORLD", address: "999 ถ.ราชดำริ", subDistrict: "", district: "ปทุมวัน", province: "กรุงเทพ", installment: "3,6", planDate: "2026-03-24", status: "error", errors: ["ชื่อภาษาไทยว่าง","ตำบล/อำเภอไม่เข้า"] },
  { id: 4, tid: "T0001237", merchantName: "บิ๊กซี ซูเปอร์เซ็นเตอร์", merchantNameEn: "BIG C SUPERCENTER", address: "88 ถ.แจ้งวัฒนะ", subDistrict: "ทุ่งสองห้อง", district: "หลักสี่", province: "กรุงเทพ", installment: "3,6,12,24", planDate: "2026-03-25", status: "valid", errors: [] },
  { id: 5, tid: "T0001238", merchantName: "SEVEN ELEVEN สาขาอโศก", merchantNameEn: "7-ELEVEN ASOKE", address: "22/5 ถ.อโศก", subDistrict: "คลองเตยเหนือ", district: "วัฒนา", province: "กรุงเทพ", installment: "", planDate: "", status: "warning", errors: ["Plan Date ว่าง"] },
];

const importHistory = [
  { id: "IMP-2026-0045", bank: "BBL",  type: "Install",    date: "2026-03-15 14:22", rows: 120, success: 118, fail: 2,  by: "สมศรี ใจดี" },
  { id: "IMP-2026-0044", bank: "KTC",  type: "Re-install", date: "2026-03-14 09:10", rows: 55,  success: 55,  fail: 0,  by: "สมชาย มั่นคง" },
  { id: "IMP-2026-0043", bank: "CRC",  type: "Move",       date: "2026-03-13 16:45", rows: 30,  success: 28,  fail: 2,  by: "สมศรี ใจดี" },
  { id: "IMP-2026-0042", bank: "UOB",  type: "Install",    date: "2026-03-12 11:30", rows: 80,  success: 80,  fail: 0,  by: "วิไล รักงาน" },
];

/* ─── Step Indicator ─────────────────────────────────────── */
function StepIndicator({ step }: { step: number }) {
  const steps = ["เลือกธนาคาร & งาน", "อัพโหลดไฟล์", "ตรวจสอบ & แก้ไข", "EDC & Partition", "ยืนยัน Import"];
  return (
    <div className="flex items-center gap-0 overflow-x-auto">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <React.Fragment key={n}>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap text-xs font-bold transition-all
              ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
              : done   ? "text-emerald-500"
              :          "text-slate-400"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0
                ${active ? "bg-white text-blue-600"
                : done   ? "bg-emerald-500 text-white"
                :          "bg-slate-200 text-slate-500"}`}>
                {done ? <Check size={10} /> : n}
              </div>
              {s}
            </div>
            {i < steps.length - 1 && <ChevronRight size={14} className="text-slate-300 shrink-0 mx-0.5" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── Bank Selector ──────────────────────────────────────── */
function BankSelector({ selected, onSelect }: { selected: string; onSelect: (b: string) => void }) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
      {BANKS.map(b => {
        const active = selected === b.id;
        return (
          <button key={b.id} onClick={() => onSelect(b.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all font-bold text-xs
              ${active
                ? `bg-slate-950 border-blue-500 text-white shadow-lg scale-105`
                : `bg-slate-950 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200`}`}>
            <div className={`w-9 h-9 ${b.color} rounded-xl flex items-center justify-center text-white text-[10px] font-black shadow-md`}>{b.label}</div>
            <span>{b.label}</span>
            {active && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Job Type Selector ──────────────────────────────────── */
function JobTypeSelector({ selected, onSelect }: { selected: string[]; onSelect: (t: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {JOB_TYPES.map(t => {
        const active = selected.includes(t.id);
        return (
          <button key={t.id} onClick={() => onSelect(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-xs font-bold transition-all
              ${active
                ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-950 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200"}`}>
            <span>{t.icon}</span> {t.label}
            {active && <Check size={12} />}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Upload Zone ────────────────────────────────────────── */
function UploadZone({ bank, onFileSelect, file }: { bank: string; onFileSelect: (f: File) => void; file: File | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const bankInfo = BANKS.find(b => b.id === bank)!;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) onFileSelect(f);
  };

  return (
    <div className="space-y-4">
      {/* Template download */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-white/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 ${bankInfo.color} rounded-xl text-white shadow-md`}><FileSpreadsheet size={18} /></div>
          <div>
            <p className="text-sm font-bold text-white">Template สำหรับ {bank}</p>
            <p className="text-xs text-slate-400 mt-0.5">ดาวน์โหลด Format ไฟล์ Excel ที่ถูกต้องสำหรับ {bank}</p>
          </div>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 ${bankInfo.color} text-white text-xs font-bold rounded-xl shadow-md hover:-translate-y-0.5 transition-all`}>
          <Download size={14} /> ดาวน์โหลด Template
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all
          ${drag   ? "border-blue-500 bg-blue-500/8"
          : file   ? "border-emerald-500 bg-slate-950"
          :          "border-white/15 bg-slate-950 hover:border-white/30"}`}>
        <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden"
          onChange={e => e.target.files?.[0] && onFileSelect(e.target.files[0])} />
        {file ? (
          <>
            <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <FileCheck2 size={32} />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-white">{file.name}</p>
              <p className="text-xs text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB · คลิกเพื่อเปลี่ยนไฟล์</p>
            </div>
            <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30">
              <CheckCircle size={13} /> พร้อม Import
            </span>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center">
              <Upload size={32} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-white">วาง หรือ คลิกเพื่อเลือกไฟล์</p>
              <p className="text-xs text-slate-400 mt-1">รองรับ .xlsx, .xls, .csv</p>
            </div>
          </>
        )}
      </div>

      {/* Bank-specific hints */}
      {(bank === "BBL" || bank === "KTC") && (
        <div className="flex gap-3 p-4 bg-amber-500/10 border border-amber-400/30 rounded-2xl">
          <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-amber-300">ข้อควรทราบสำหรับ {bank}:</p>
            {bank === "BBL" && <>
              <p className="text-amber-200/80">• ระบบจะแก้ไขลำดับชื่อไทย/อังกฤษให้อัตโนมัติ</p>
              <p className="text-amber-200/80">• ตรวจสอบ Installment plan ก่อน Import</p>
              <p className="text-amber-200/80">• ที่อยู่/ตำบล/อำเภอ จะ mapping อัตโนมัติหากข้อมูลตรงกับ DB</p>
            </>}
            {bank === "KTC" && <>
              <p className="text-amber-200/80">• ตรวจสอบ Installment period ให้ถูกต้อง (3,6,10,12,24)</p>
              <p className="text-amber-200/80">• ที่อยู่/ตำบล/อำเภอ จะ mapping อัตโนมัติ</p>
            </>}
          </div>
        </div>
      )}
      {(bank === "CRC" || bank === "UOB") && (
        <div className="flex gap-3 p-4 bg-blue-500/10 border border-blue-400/30 rounded-2xl">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-blue-300">Format ใหม่สำหรับ {bank}:</p>
            <p className="text-blue-200/80">• กรุณาใช้ Template ที่ดาวน์โหลดมาเท่านั้น</p>
            <p className="text-blue-200/80">• ตรวจสอบ Column mapping ก่อนส่งข้อมูล</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Preview & Edit Table ───────────────────────────────── */
function PreviewTable({ rows, onRowEdit }: { rows: any[]; bank: string; onRowEdit: (id: number, field: string, val: string) => void }) {
  const [editCell, setEditCell] = useState<{ id: number; field: string } | null>(null);
  const [search, setSearch] = useState("");
  const [filterError, setFilterError] = useState(false);

  const errorCount  = rows.filter(r => r.status === "error").length;
  const warnCount   = rows.filter(r => r.status === "warning").length;
  const validCount  = rows.filter(r => r.status === "valid").length;

  const filtered = rows.filter(r => {
    const matchSearch = !search || r.tid.includes(search) || r.merchantName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filterError || r.status !== "valid";
    return matchSearch && matchFilter;
  });

  const EditableCell = ({ row, field, value }: { row: any; field: string; value: string }) => {
    const isEditing = editCell?.id === row.id && editCell?.field === field;
    const [val, setVal] = useState(value);
    return isEditing ? (
      <input autoFocus value={val}
        onChange={e => setVal(e.target.value)}
        onBlur={() => { onRowEdit(row.id, field, val); setEditCell(null); }}
        onKeyDown={e => e.key === "Enter" && (onRowEdit(row.id, field, val), setEditCell(null))}
        className="w-full px-2 py-1 bg-blue-900/60 border border-blue-500 rounded text-xs text-white outline-none min-w-[80px]" />
    ) : (
      <span onClick={() => setEditCell({ id: row.id, field })}
        className={`cursor-pointer hover:text-blue-300 transition-colors ${!value ? "text-rose-400 italic" : ""}`}>
        {value || "—"}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Summary pills */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/12 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400">
          <CheckCircle size={13} /> ถูกต้อง {validCount} รายการ
        </div>
        {warnCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/12 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-400">
            <AlertTriangle size={13} /> คำเตือน {warnCount} รายการ
          </div>
        )}
        {errorCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/12 border border-rose-500/30 rounded-xl text-xs font-bold text-rose-400">
            <XCircle size={13} /> ข้อผิดพลาด {errorCount} รายการ
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2.5 bg-slate-900 border border-white/10 rounded-xl">
          <Search size={14} className="text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหา TID หรือ ชื่อร้าน..."
            className="bg-transparent text-xs text-white outline-none flex-1 placeholder:text-slate-500" />
        </div>
        <button onClick={() => setFilterError(!filterError)}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all
            ${filterError ? "bg-rose-500/15 border-rose-500/40 text-rose-400" : "bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200"}`}>
          <Filter size={13} /> เฉพาะมีปัญหา
        </button>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold hover:bg-emerald-500/15 transition-all">
          <RefreshCw size={13} /> Auto-Fix ทั้งหมด
        </button>
      </div>

      <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
        <Edit2 size={11} /> คลิกที่ข้อมูลในตารางเพื่อแก้ไขโดยตรง
      </p>

      {/* Table */}
      <div className="overflow-auto rounded-2xl border border-white/10 shadow-sm">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-900 border-b border-white/10">
              <th className="px-3 py-3 text-left text-slate-400 font-bold w-8">#</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">TID</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">ชื่อร้าน (TH)</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">ชื่อร้าน (EN)</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">ตำบล</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">อำเภอ</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">Installment</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">Plan Date</th>
              <th className="px-3 py-3 text-center text-slate-400 font-bold">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(row => (
              <tr key={row.id}
                className={`transition-colors hover:bg-slate-800/60
                  ${row.status === "error"   ? "bg-rose-500/5"
                  : row.status === "warning" ? "bg-amber-500/5"
                  :                            "bg-slate-950"}`}>
                <td className="px-3 py-2.5 text-slate-500">{row.id}</td>
                <td className="px-3 py-2.5 font-mono text-blue-400"><EditableCell row={row} field="tid" value={row.tid} /></td>
                <td className="px-3 py-2.5 text-slate-200"><EditableCell row={row} field="merchantName" value={row.merchantName} /></td>
                <td className="px-3 py-2.5 text-slate-200"><EditableCell row={row} field="merchantNameEn" value={row.merchantNameEn} /></td>
                <td className="px-3 py-2.5 text-slate-300"><EditableCell row={row} field="subDistrict" value={row.subDistrict} /></td>
                <td className="px-3 py-2.5 text-slate-300"><EditableCell row={row} field="district" value={row.district} /></td>
                <td className="px-3 py-2.5 text-slate-300"><EditableCell row={row} field="installment" value={row.installment} /></td>
                <td className="px-3 py-2.5 text-slate-300"><EditableCell row={row} field="planDate" value={row.planDate} /></td>
                <td className="px-3 py-2.5 text-center">
                  {row.status === "valid"   && <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[11px]">✓ OK</span>}
                  {row.status === "error"   && <span title={row.errors.join(", ")} className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-bold text-[11px] cursor-help">✗ {row.errors.length}</span>}
                  {row.status === "warning" && <span title={row.errors.join(", ")} className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold text-[11px] cursor-help">⚠ {row.errors.length}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── EDC & Partition Panel ──────────────────────────────── */
function EdcPartitionPanel({ rows }: { rows: any[] }) {
  const [assignments, setAssignments] = useState<Record<number, { edcModel: string; partitions: string[] }>>(() =>
    Object.fromEntries(rows.map(r => [r.id, { edcModel: "", partitions: [] }]))
  );
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkModel, setBulkModel] = useState("");
  const [bulkPartitions, setBulkPartitions] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const togglePartition = (rowId: number, p: string) => {
    setAssignments(prev => {
      const cur = prev[rowId].partitions;
      return { ...prev, [rowId]: { ...prev[rowId], partitions: cur.includes(p) ? cur.filter(x => x !== p) : [...cur, p] } };
    });
  };

  const applyBulk = () => {
    if (!selectedRows.length) return;
    setAssignments(prev => {
      const next = { ...prev };
      selectedRows.forEach(id => { next[id] = { edcModel: bulkModel || prev[id].edcModel, partitions: bulkPartitions.length ? bulkPartitions : prev[id].partitions }; });
      return next;
    });
    setBulkMode(false); setSelectedRows([]);
  };

  const toggleRow = (id: number) => setSelectedRows(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleAll = () => setSelectedRows(selectedRows.length === rows.length ? [] : rows.map(r => r.id));
  const filtered = rows.filter(r => !search || r.tid.includes(search) || r.merchantName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex gap-3 p-4 bg-blue-500/10 border border-blue-400/25 rounded-2xl">
        <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-200/80">กำหนด EDC Model และ Partition ให้แต่ละ TID สามารถเลือก<strong className="text-blue-300">หลาย Partition</strong>พร้อมกันได้ หรือใช้ <strong className="text-blue-300">Bulk Assign</strong> เพื่อตั้งค่าหลายรายการในครั้งเดียว</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2.5 bg-slate-900 border border-white/10 rounded-xl">
          <Search size={14} className="text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหา TID..."
            className="bg-transparent text-xs text-white outline-none flex-1 placeholder:text-slate-500" />
        </div>
        <button onClick={() => { setBulkMode(!bulkMode); setSelectedRows([]); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all
            ${bulkMode ? "bg-blue-500/15 border-blue-500/40 text-blue-300" : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"}`}>
          <Tag size={13} /> Bulk Assign {selectedRows.length > 0 && `(${selectedRows.length})`}
        </button>
      </div>

      {/* Bulk panel */}
      {bulkMode && (
        <div className="p-4 bg-blue-500/10 border border-blue-400/25 rounded-2xl space-y-4 animate-in fade-in duration-200">
          <p className="text-xs font-bold text-blue-300">Bulk Assign — เลือก TID ในตารางด้านล่าง แล้วกำหนดค่าที่นี่</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <p className="text-[11px] text-slate-400 mb-1.5 font-bold">EDC Model</p>
              <select value={bulkModel} onChange={e => setBulkModel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-xs text-white outline-none">
                <option value="">— ไม่เปลี่ยน —</option>
                {EDC_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-[11px] text-slate-400 mb-1.5 font-bold">Partition</p>
              <div className="flex flex-wrap gap-1.5">
                {PARTITIONS.map(p => (
                  <button key={p} onClick={() => setBulkPartitions(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all
                      ${bulkPartitions.includes(p) ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-900 border-white/15 text-slate-400 hover:text-white"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={applyBulk} disabled={!selectedRows.length}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none">
              <Save size={13} /> Apply {selectedRows.length} รายการ
            </button>
            <button onClick={() => { setBulkMode(false); setSelectedRows([]); }}
              className="px-4 py-2 bg-slate-900 border border-white/15 text-slate-300 text-xs font-bold rounded-xl hover:text-white transition-colors">
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-2xl border border-white/10 shadow-sm">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-900 border-b border-white/10">
              {bulkMode && (
                <th className="px-3 py-3 w-8">
                  <button onClick={toggleAll}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedRows.length === rows.length ? "bg-blue-600 border-blue-500" : "border-slate-500"}`}>
                    {selectedRows.length === rows.length && <Check size={10} className="text-white" />}
                  </button>
                </th>
              )}
              <th className="px-3 py-3 text-left text-slate-400 font-bold">TID</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold">ชื่อร้าน</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold min-w-[180px]">EDC Model</th>
              <th className="px-3 py-3 text-left text-slate-400 font-bold min-w-[260px]">Partition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(row => {
              const asgn = assignments[row.id];
              const isSel = selectedRows.includes(row.id);
              return (
                <tr key={row.id}
                  onClick={bulkMode ? () => toggleRow(row.id) : undefined}
                  className={`transition-colors hover:bg-slate-800/60 ${bulkMode ? "cursor-pointer" : ""} ${isSel ? "bg-blue-500/8" : "bg-slate-950"}`}>
                  {bulkMode && (
                    <td className="px-3 py-2.5">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSel ? "bg-blue-600 border-blue-500" : "border-slate-500"}`}>
                        {isSel && <Check size={10} className="text-white" />}
                      </div>
                    </td>
                  )}
                  <td className="px-3 py-2.5 font-mono text-blue-400">{row.tid}</td>
                  <td className="px-3 py-2.5 text-slate-200 max-w-[120px] truncate">{row.merchantName || row.merchantNameEn}</td>
                  <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                    <select value={asgn.edcModel}
                      onChange={e => setAssignments(prev => ({ ...prev, [row.id]: { ...prev[row.id], edcModel: e.target.value } }))}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-white/15 rounded-lg text-xs text-white outline-none hover:border-white/25 transition-colors">
                      <option value="">— เลือก —</option>
                      {EDC_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                    <div className="flex flex-wrap gap-1">
                      {PARTITIONS.map(p => (
                        <button key={p} onClick={() => togglePartition(row.id, p)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all
                            ${asgn.partitions.includes(p) ? "bg-blue-600 border-blue-500 text-white shadow-sm" : "bg-slate-900 border-white/15 text-slate-500 hover:border-white/30 hover:text-slate-300"}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Confirm Panel ──────────────────────────────────────── */
function ConfirmPanel({ bank, jobTypes, rows, onConfirm }: { bank: string; jobTypes: string[]; rows: any[]; onConfirm: () => void }) {
  const errorCount = rows.filter(r => r.status === "error").length;
  const validCount = rows.filter(r => r.status !== "error").length;

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "ธนาคาร",        value: bank,                      accent: `text-white` },
          { label: "ประเภทงาน",     value: jobTypes.join(", ") || "—", accent: "text-white" },
          { label: "รายการทั้งหมด", value: `${rows.length} รายการ`,   accent: "text-white" },
          { label: "พร้อม Import",  value: `${validCount} รายการ`,    accent: "text-emerald-400" },
        ].map(item => (
          <div key={item.label} className="p-4 bg-slate-900 border border-white/10 rounded-2xl">
            <p className="text-[11px] text-slate-400 font-bold">{item.label}</p>
            <p className={`text-lg font-black mt-1 ${item.accent}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {errorCount > 0 && (
        <div className="flex gap-3 p-4 bg-rose-500/10 border border-rose-400/25 rounded-2xl">
          <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-rose-300">มีข้อผิดพลาด {errorCount} รายการ</p>
            <p className="text-rose-200/70 mt-0.5">รายการที่มีข้อผิดพลาดจะถูกข้ามการ Import เว้นแต่กลับไปแก้ไขก่อน</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl">
        <div>
          <p className="text-sm font-bold text-white">ยืนยันการ Import</p>
          <p className="text-xs text-slate-400 mt-0.5">ระบบจะ Import {validCount} รายการเข้า Database ทันที</p>
        </div>
        <button onClick={onConfirm}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 hover:bg-emerald-500 transition-all">
          <CheckCircle size={16} /> Import เลย
        </button>
      </div>
    </div>
  );
}

/* ─── History Tab ────────────────────────────────────────── */
function HistoryTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400">ประวัติการ Import ล่าสุด</p>
        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">
          <Download size={13} /> Export Log
        </button>
      </div>
      <div className="space-y-2">
        {importHistory.map(h => {
          const bankInfo = BANKS.find(b => b.id === h.bank)!;
          return (
            <div key={h.id} className="flex items-center gap-4 px-4 py-3.5 bg-slate-950 border border-white/10 rounded-2xl hover:bg-slate-900 transition-colors">
              <div className={`w-10 h-10 ${bankInfo.color} rounded-xl flex items-center justify-center text-white text-[10px] font-black shadow-md shrink-0`}>{h.bank}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white">{h.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${bankInfo.color} text-white`}>{h.bank}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{h.type}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={10} /> {h.date}</span>
                  <span>by {h.by}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-white">{h.rows} รายการ</p>
                <p className="text-[11px] mt-0.5">
                  <span className="text-emerald-400 font-bold">{h.success} สำเร็จ</span>
                  {h.fail > 0 && <span className="text-rose-400 font-bold"> · {h.fail} ผิดพลาด</span>}
                </p>
              </div>
              <button className="p-2 text-slate-500 hover:text-slate-200 transition-colors shrink-0"><Eye size={15} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Success State ──────────────────────────────────────── */
function SuccessPanel({ bank, count, onReset }: { bank: string; count: number; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 animate-in zoom-in-95 duration-300">
      <div className="w-24 h-24 bg-emerald-500/15 text-emerald-400 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/15">
        <CheckCircle size={44} />
      </div>
      <div className="text-center">
        <p className="text-2xl font-black text-white">Import สำเร็จ!</p>
        <p className="text-sm text-slate-300 mt-2">
          นำเข้าข้อมูล <span className="text-emerald-400 font-bold">{count} รายการ</span> จากธนาคาร <span className="text-white font-bold">{bank}</span> เข้าระบบเรียบร้อยแล้ว
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all">
          <Plus size={16} /> Import ใหม่
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-white/15 text-slate-200 text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all">
          <Eye size={16} /> ดูรายการ
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export function ImportOrderView() {
  const [mainTab, setMainTab]         = useState<"new" | "history">("new");
  const [step, setStep]               = useState(1);
  const [selectedBank, setSelectedBank]         = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [file, setFile]               = useState<File | null>(null);
  const [rows, setRows]               = useState<any[]>([]);
  const [done, setDone]               = useState(false);

  const toggleJobType = (t: string) =>
    setSelectedJobTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleFileSelect = (f: File) => {
    setFile(f);
    setRows(generateMockRows(selectedBank));
  };

  const handleRowEdit = (id: number, field: string, val: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val, status: "valid", errors: [] } : r));
  };

  const canProceed = () => {
    if (step === 1) return !!selectedBank && selectedJobTypes.length > 0;
    if (step === 2) return !!file;
    return true;
  };

  const reset = () => { setStep(1); setSelectedBank(""); setSelectedJobTypes([]); setFile(null); setRows([]); setDone(false); };

  return (
    <div className="flex flex-col h-full gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-white">Import Order</h2>
          <p className="text-xs text-slate-400 mt-0.5">นำเข้าข้อมูล Order จากไฟล์ Excel — รองรับทุกธนาคาร ทุก Partition ทุกประเภทงาน</p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-2xl border border-white/10">
          {(["new", "history"] as const).map(t => (
            <button key={t} onClick={() => setMainTab(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all
                ${mainTab === t ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}>
              {t === "new" ? <><Upload size={13} /> Import ใหม่</> : <><History size={13} /> ประวัติ</>}
            </button>
          ))}
        </div>
      </div>

      {mainTab === "history" ? (
        <HistoryTab />
      ) : done ? (
        <SuccessPanel bank={selectedBank} count={rows.filter(r => r.status !== "error").length} onReset={reset} />
      ) : (
        <>
          {/* Step indicator */}
          <div className="bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 overflow-x-auto shadow-sm">
            <StepIndicator step={step} />
          </div>

          {/* Step content */}
          <div className="flex-1 bg-slate-950 border border-white/10 rounded-2xl p-6 overflow-y-auto shadow-sm">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">1</span>
                    เลือกธนาคาร
                  </p>
                  <BankSelector selected={selectedBank} onSelect={setSelectedBank} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">2</span>
                    เลือกประเภทงาน
                    <span className="text-slate-600 normal-case font-normal">(เลือกได้หลายประเภท)</span>
                  </p>
                  <JobTypeSelector selected={selectedJobTypes} onSelect={toggleJobType} />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="animate-in fade-in duration-300">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">3</span>
                  อัพโหลดไฟล์ Import
                </p>
                <UploadZone bank={selectedBank} onFileSelect={handleFileSelect} file={file} />
              </div>
            )}
            {step === 3 && (
              <div className="animate-in fade-in duration-300">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">4</span>
                  ตรวจสอบ & แก้ไขข้อมูล
                </p>
                <PreviewTable rows={rows} bank={selectedBank} onRowEdit={handleRowEdit} />
              </div>
            )}
            {step === 4 && (
              <div className="animate-in fade-in duration-300">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">5</span>
                  กำหนด EDC & Partition
                </p>
                <EdcPartitionPanel rows={rows} />
              </div>
            )}
            {step === 5 && (
              <div className="animate-in fade-in duration-300">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">✓</span>
                  ยืนยันการ Import
                </p>
                <ConfirmPanel bank={selectedBank} jobTypes={selectedJobTypes} rows={rows} onConfirm={() => setDone(true)} />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-white/15 text-slate-300 text-sm font-bold rounded-2xl hover:text-white hover:border-white/25 transition-all disabled:opacity-30 disabled:pointer-events-none">
              <ChevronLeft size={16} /> ย้อนกลับ
            </button>
            {step < 5 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-500 transition-all disabled:opacity-40 disabled:pointer-events-none">
                ถัดไป <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={() => setDone(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 transition-all">
                <CheckCircle size={16} /> ยืนยัน Import
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
