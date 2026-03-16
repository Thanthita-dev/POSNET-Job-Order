"use client";

import React, { useState } from "react";
import {
  User, Mail, Phone, Building2, Shield, Key, Bell, Camera,
  Edit3, Check, X, Award, Briefcase, Clock, TrendingUp,
  ChevronRight, Lock, Smartphone, Eye, EyeOff, Save,
  Globe, MapPin, Calendar, Activity, Star, Zap
} from "lucide-react";

const STATS = [
  { label: "ใบงานที่จัดการ", value: "1,248", icon: <Briefcase size={18} />, color: "blue", trend: "+12%" },
  { label: "SLA ผ่านเกณฑ์", value: "96.4%", icon: <Award size={18} />, color: "emerald", trend: "+2.1%" },
  { label: "ชั่วโมงออนไลน์", value: "342h", icon: <Clock size={18} />, color: "indigo", trend: "30 วัน" },
  { label: "คะแนนประสิทธิภาพ", value: "4.9/5", icon: <Star size={18} />, color: "amber", trend: "เยี่ยม" },
];

const ACTIVITY = [
  { action: "อนุมัติใบงาน JOB-2024-0892", time: "10 นาทีที่แล้ว", type: "approve" },
  { action: "ปิดงาน JOB-2024-0881 (Completed)", time: "1 ชั่วโมงที่แล้ว", type: "complete" },
  { action: "สร้างรายงาน SLA ประจำเดือน", time: "3 ชั่วโมงที่แล้ว", type: "report" },
  { action: "อัปเดตข้อมูลลูกค้า Kasikorn Bank", time: "เมื่อวาน", type: "edit" },
  { action: "เข้าสู่ระบบจาก MacBook Pro", time: "เมื่อวาน", type: "login" },
  { action: "ส่งออกรายงานใบสั่งงาน Q1/2025", time: "3 วันที่แล้ว", type: "export" },
];

const colorMap: Record<string, { bg: string; text: string; glow: string; border: string }> = {
  blue:    { bg: "bg-blue-500/15",    text: "text-blue-400",    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",    border: "border-blue-500/25" },
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-400", glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",   border: "border-emerald-500/25" },
  indigo:  { bg: "bg-indigo-500/15",  text: "text-indigo-400",  glow: "shadow-[0_0_20px_rgba(99,102,241,0.3)]",   border: "border-indigo-500/25" },
  amber:   { bg: "bg-amber-500/15",   text: "text-amber-400",   glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]",   border: "border-amber-500/25" },
};

const activityTypeStyle: Record<string, { dot: string; glow: string }> = {
  approve:  { dot: "bg-emerald-500", glow: "shadow-[0_0_6px_rgba(16,185,129,0.8)]" },
  complete: { dot: "bg-blue-500",    glow: "shadow-[0_0_6px_rgba(59,130,246,0.8)]" },
  report:   { dot: "bg-indigo-500",  glow: "shadow-[0_0_6px_rgba(99,102,241,0.8)]" },
  edit:     { dot: "bg-amber-500",   glow: "shadow-[0_0_6px_rgba(245,158,11,0.8)]" },
  login:    { dot: "bg-slate-400",   glow: "" },
  export:   { dot: "bg-violet-500",  glow: "shadow-[0_0_6px_rgba(139,92,246,0.8)]" },
};

function EditableField({ label, value, icon, type = "text" }: { label: string; value: string; icon: React.ReactNode; type?: string }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const [temp, setTemp] = useState(value);

  return (
    <div className="group flex items-start gap-4 py-4 border-b border-white/6 last:border-0">
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type={type}
              value={temp}
              onChange={e => setTemp(e.target.value)}
              className="flex-1 bg-white/5 border border-blue-500/40 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button onClick={() => { setVal(temp); setEditing(false); }} className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors">
              <Check size={14} />
            </button>
            <button onClick={() => { setTemp(val); setEditing(false); }} className="p-1.5 rounded-lg bg-white/5 text-slate-500 hover:bg-white/10 transition-colors">
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-200 truncate">{val}</p>
            <button
              onClick={() => setEditing(true)}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-all ml-2 shrink-0"
            >
              <Edit3 size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PasswordSection() {
  const [open, setOpen] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setOpen(false);
    setOldPw(""); setNewPw("");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="py-4 border-b border-white/6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 shrink-0">
            <Key size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">รหัสผ่าน</p>
            <p className="text-sm font-semibold text-slate-200">••••••••••</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-[11px] font-bold text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition-colors"
        >
          {open ? "ยกเลิก" : "เปลี่ยน"}
        </button>
      </div>
      {open && (
        <div className="mt-4 space-y-3 pl-12 animate-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="รหัสผ่านเดิม"
              value={oldPw}
              onChange={e => setOldPw(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 pr-10"
            />
            <button onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {showOld ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="รหัสผ่านใหม่ (อย่างน้อย 8 ตัวอักษร)"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 pr-10"
            />
            <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {newPw.length > 0 && (
            <div className="flex gap-1">
              {[1,2,3,4].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${newPw.length >= i*2 ? i <= 2 ? 'bg-amber-500' : 'bg-emerald-500' : 'bg-white/10'}`} />
              ))}
              <span className="text-[10px] text-slate-500 ml-2">{newPw.length < 4 ? 'อ่อน' : newPw.length < 8 ? 'ปานกลาง' : 'แข็งแกร่ง'}</span>
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={!oldPw || newPw.length < 8}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Save size={14} /> บันทึกรหัสผ่าน
          </button>
        </div>
      )}
      {saved && (
        <div className="mt-2 pl-12 text-[11px] text-emerald-400 flex items-center gap-1 animate-in fade-in duration-200">
          <Check size={12} /> เปลี่ยนรหัสผ่านเรียบร้อยแล้ว
        </div>
      )}
    </div>
  );
}

function ToggleRow({ label, description, icon, defaultOn = false }: { label: string; description: string; icon: React.ReactNode; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/6 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-200">{label}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${on ? 'bg-blue-600' : 'bg-white/15'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

export function ProfileView() {
  const [avatarHover, setAvatarHover] = useState(false);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900/90 to-slate-950/95 border border-white/8 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none" />

        {/* Cover gradient strip */}
        <div className="h-28 bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-violet-900/30 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/60" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="px-8 pb-8">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-10 relative z-10">
            <div
              className="relative cursor-pointer shrink-0"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-[0_8px_32px_rgba(59,130,246,0.45)] border-4 border-slate-950 transition-transform duration-200 hover:scale-105">
                HQ
              </div>
              {avatarHover && (
                <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center animate-in fade-in duration-150 border-4 border-slate-950">
                  <Camera size={22} className="text-white" />
                </div>
              )}
              {/* Online badge */}
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>

            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black text-white">Admin HQ</h2>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Zap size={10} className="fill-current" /> Super Admin
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 font-medium">POSNET Co., Ltd. · สาขา HQ Bangkok</p>
            </div>

            <button className="sm:self-start flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm text-slate-300 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <Edit3 size={14} /> แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const c = colorMap[s.color];
          return (
            <div key={s.label} className={`noise-overlay card-shimmer relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/95 border border-white/8 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-transform duration-300`}>
              <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-3 ${c.glow}`}>
                {s.icon}
              </div>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
              <span className={`absolute top-4 right-4 text-[10px] font-bold ${c.text}`}>{s.trend}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — Info + Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1 flex items-center gap-2">
              <User size={16} className="text-blue-400" /> ข้อมูลส่วนตัว
            </h3>
            <p className="text-[11px] text-slate-500 mb-5">กดที่ช่องเพื่อแก้ไขข้อมูล</p>
            <EditableField label="ชื่อ-นามสกุล" value="Admin HQ" icon={<User size={14} />} />
            <EditableField label="อีเมล" value="admin@posnet.co.th" icon={<Mail size={14} />} type="email" />
            <EditableField label="เบอร์โทรศัพท์" value="02-XXX-XXXX" icon={<Phone size={14} />} type="tel" />
            <EditableField label="บริษัท / องค์กร" value="POSNET Co., Ltd." icon={<Building2 size={14} />} />
            <EditableField label="ที่ตั้ง" value="กรุงเทพมหานคร, ประเทศไทย" icon={<MapPin size={14} />} />
            <EditableField label="เว็บไซต์" value="www.posnet.co.th" icon={<Globe size={14} />} />
          </div>

          {/* Security */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1 flex items-center gap-2">
              <Shield size={16} className="text-emerald-400" /> ความปลอดภัย
            </h3>
            <p className="text-[11px] text-slate-500 mb-5">จัดการการเข้าถึงและความปลอดภัยบัญชี</p>
            <PasswordSection />
            <ToggleRow
              label="การยืนยันตัวตนสองขั้นตอน (2FA)"
              description="เพิ่มชั้นความปลอดภัยด้วย OTP"
              icon={<Smartphone size={14} />}
              defaultOn={true}
            />
            <ToggleRow
              label="แจ้งเตือนเมื่อมีการเข้าสู่ระบบใหม่"
              description="ส่งอีเมลเมื่อมีการ login จากอุปกรณ์ใหม่"
              icon={<Bell size={14} />}
              defaultOn={true}
            />
            <ToggleRow
              label="ล็อกอัตโนมัติเมื่อไม่ได้ใช้งาน"
              description="ล็อกหน้าจอหลังจาก 30 นาที"
              icon={<Lock size={14} />}
              defaultOn={false}
            />

            {/* Active Sessions */}
            <div className="mt-4 pt-4 border-t border-white/6">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">เซสชันที่เข้าใช้งาน</p>
              {[
                { device: "MacBook Pro 16″", location: "Bangkok, TH", time: "ตอนนี้", active: true },
                { device: "iPhone 15 Pro", location: "Bangkok, TH", time: "2 ชม. ที่แล้ว", active: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/4 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.active ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-slate-600'}`} />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{s.device}</p>
                      <p className="text-[10px] text-slate-500">{s.location} · {s.time}</p>
                    </div>
                  </div>
                  {!s.active && (
                    <button className="text-[10px] font-bold text-rose-400 hover:text-rose-300 px-2 py-1 hover:bg-rose-500/10 rounded-lg transition-colors">
                      ออก
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Role & Access */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> สิทธิ์การเข้าถึง
            </h3>
            <div className="space-y-2">
              {[
                { label: "Super Admin", icon: "🔑", active: true },
                { label: "จัดการใบงาน", icon: "📋", active: true },
                { label: "ดูรายงาน", icon: "📊", active: true },
                { label: "จัดการผู้ใช้", icon: "👥", active: true },
                { label: "ตั้งค่าระบบ", icon: "⚙️", active: true },
                { label: "อนุมัติ SLA", icon: "✅", active: true },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                  <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
                    <span>{p.icon}</span> {p.label}
                  </span>
                  <Check size={13} className="text-emerald-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications pref */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Bell size={16} className="text-indigo-400" /> การแจ้งเตือน
            </h3>
            <ToggleRow label="SLA เกินกำหนด" description="แจ้งเตือนทันที" icon={<Activity size={14} />} defaultOn={true} />
            <ToggleRow label="งานใหม่เข้า" description="แจ้งเตือนทุกครั้ง" icon={<Briefcase size={14} />} defaultOn={true} />
            <ToggleRow label="รายงานรายสัปดาห์" description="ส่งทุกวันจันทร์" icon={<TrendingUp size={14} />} defaultOn={false} />
          </div>

          {/* Recent Activity */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={16} className="text-violet-400" /> กิจกรรมล่าสุด
            </h3>
            <div className="space-y-0">
              {ACTIVITY.map((a, i) => {
                const style = activityTypeStyle[a.type];
                return (
                  <div key={i} className="flex gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${style.dot} ${style.glow}`} />
                    <div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{a.action}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-3 w-full text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1 py-2 hover:bg-blue-500/5 rounded-xl transition-colors">
              ดูทั้งหมด <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
