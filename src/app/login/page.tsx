"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";

/* ── Floating mock dashboard card ─────────────────────────── */
function MockDashboard() {
  return (
    <div
      className="w-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
      style={{
        background: "rgba(10,16,30,0.85)",
        backdropFilter: "blur(20px)",
        transform: "perspective(900px) rotateY(-8deg) rotateX(4deg)",
      }}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/6" style={{ background: "rgba(255,255,255,0.03)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        <span className="flex-1 text-center text-[10px] font-mono text-slate-600">posnet.app — Dashboard</span>
      </div>

      <div className="p-4 space-y-3">
        {/* Mini stat row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "งานทั้งหมด", val: "47", color: "#3b82f6" },
            { label: "SLA On-Time", val: "94%", color: "#10b981" },
            { label: "เร่งด่วน", val: "3", color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-2.5 border border-white/6" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-[11px] font-black" style={{ color: s.color }}>{s.val}</p>
              <p className="text-[9px] text-slate-600 mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div className="rounded-xl p-3 border border-white/6" style={{ background: "rgba(255,255,255,0.03)" }}>
          <p className="text-[9px] text-slate-600 mb-2 font-bold uppercase tracking-wider">งาน 7 วันล่าสุด</p>
          <div className="flex items-end gap-1.5 h-12">
            {[6, 9, 5, 11, 8, 14, 7].map((v, i) => (
              <div key={i} className="flex-1 rounded-sm transition-all"
                style={{ height: `${(v / 14) * 100}%`, background: i === 5 ? "#3b82f6" : "rgba(59,130,246,0.25)" }} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["จ","อ","พ","พฤ","ศ","ส","อา"].map(d => (
              <span key={d} className="flex-1 text-center text-[8px] text-slate-700">{d}</span>
            ))}
          </div>
        </div>

        {/* Mini job list */}
        <div className="space-y-1.5">
          {[
            { id: "JOB-011", name: "Cafe Amazon · Ladprao", dot: "#10b981", status: "In Progress" },
            { id: "JOB-010", name: "Bank Of Wealth · Silom", dot: "#f59e0b", status: "Pending" },
            { id: "JOB-009", name: "7-Eleven · Sukhumvit", dot: "#3b82f6", status: "Closed" },
          ].map(j => (
            <div key={j.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/4"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: j.dot }} />
              <span className="text-[9px] font-mono text-slate-500 shrink-0">{j.id}</span>
              <span className="text-[9px] text-slate-500 flex-1 truncate">{j.name}</span>
              <span className="text-[8px] font-bold shrink-0" style={{ color: j.dot }}>{j.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("company");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    switch (role) {
      case "company":  setUsername("admin@company.com");   setPassword("••••••••"); break;
      case "customer": setUsername("client_a@retail.com"); setPassword("••••••••"); break;
      case "staff":    setUsername("tech_somchai");         setPassword("••••••••"); break;
      default:         setUsername("");                     setPassword("");
    }
  }, [role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); router.push(`/?role=${role}`); }, 1500);
  };

  const roles = [
    { value: "company",  label: "บริษัท / Admin",  sub: "Company Portal" },
    { value: "customer", label: "ลูกค้า",           sub: "Customer Portal" },
    { value: "staff",    label: "ช่างเทคนิค",       sub: "Tech App" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans overflow-hidden"
      style={{ background: "#070b14" }}>

      {/* ── Left visual panel ─────────────────────── */}
      <div className="relative lg:w-[52%] flex flex-col items-center justify-center overflow-hidden shrink-0 min-h-[360px] lg:min-h-screen">

        {/* Background gradient layers */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #0d1f4e 0%, #111e45 50%, #0c1835 100%)" }} />
        {/* Radial light source top-right */}
        <div className="absolute top-[-5%] right-[-5%] w-[70%] h-[70%] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)" }} />
        {/* Radial light source bottom-left */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)" }} />

        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="g" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>

        {/* Glowing ring behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[64%] pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-blue-500/20"
            style={{ boxShadow: "0 0 60px 10px rgba(59,130,246,0.08), inset 0 0 40px rgba(59,130,246,0.06)" }} />
          <div className="absolute inset-6 rounded-full border border-blue-400/10" />
          <div className="absolute inset-12 rounded-full border border-blue-300/8" />
        </div>

        {/* Subtle horizontal light streak */}
        <div className="absolute top-[36%] left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,130,255,0.2) 35%, rgba(99,130,255,0.35) 50%, rgba(99,130,255,0.2) 65%, transparent 100%)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-12 pt-16 pb-6">
          {/* Logo */}
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/15 shadow-[0_0_40px_rgba(59,130,246,0.3),0_8px_32px_rgba(0,0,0,0.4)]"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(79,70,229,0.4) 100%)", backdropFilter: "blur(12px)" }}>
              <span className="text-3xl font-black text-white" style={{ textShadow: "0 0 20px rgba(147,197,253,0.6)" }}>P</span>
            </div>
          </div>
          <p className="text-2xl font-black tracking-[0.2em] text-white mb-1" style={{ textShadow: "0 0 30px rgba(147,197,253,0.2)" }}>POSNET</p>
          <p className="text-[11px] text-blue-300/40 tracking-[0.25em] uppercase mb-12">Field Service Management</p>

          {/* Floating dashboard card */}
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute inset-x-8 bottom-0 h-12 blur-3xl opacity-60 pointer-events-none"
              style={{ background: "rgba(59,130,246,0.3)" }} />
            <MockDashboard />
          </div>
        </div>

        {/* Bottom label */}
        <p className="relative z-10 text-[10px] text-blue-200/20 font-medium tracking-widest pb-8">v2.4.1 · 2026</p>

        {/* Wavy right edge — wide, prominent */}
        <div className="absolute right-0 top-0 h-full w-32 z-20 hidden lg:block pointer-events-none">
          <svg viewBox="0 0 128 800" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,0 L55,0 Q128,130 55,270 Q0,380 55,500 Q128,610 55,730 Q30,765 55,800 L0,800 Z"
              fill="#070b14"
            />
          </svg>
        </div>
      </div>

      {/* ── Right form panel ────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0c1220 0%, #070b14 50%, #0a0f1e 100%)" }}>

        {/* Depth layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Soft center glow to push card forward */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px]"
            style={{ background: "radial-gradient(circle, rgba(30,50,100,0.35) 0%, transparent 70%)" }} />
          {/* Faint top-left light */}
          <div className="absolute top-0 left-0 w-64 h-64"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
          {/* Subtle bottom-right */}
          <div className="absolute bottom-0 right-0 w-48 h-48"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />
        </div>

        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-sm">P</div>
          <span className="text-base font-black text-white tracking-widest">POSNET</span>
        </div>

        {/* White card */}
        <div className="relative z-10 w-full max-w-[380px]">

          {/* Outer glow ring */}
          <div className="absolute -inset-3 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />

          <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]"
            style={{ background: "#ffffff" }}>

            {/* Blue accent bar at top */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #2563eb 0%, #6366f1 100%)" }} />

            <div className="p-8">
              {/* Header */}
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base shadow-[0_4px_12px_rgba(37,99,235,0.4)]"
                    style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}>P</div>
                  <div>
                    <p className="text-sm font-black text-slate-800 tracking-wider">POSNET</p>
                    <p className="text-[10px] text-slate-400 tracking-widest uppercase">Field Service</p>
                  </div>
                </div>
                <h2 className="text-[1.4rem] font-bold text-slate-900 mb-1">ยินดีต้อนรับ</h2>
                <p className="text-sm text-slate-400">เข้าสู่ระบบเพื่อจัดการงานของคุณ</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Role selector */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-500 inline-block" />
                    Demo — เลือกสิทธิ์
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((r) => (
                      <label key={r.value} className="cursor-pointer">
                        <input type="radio" name="role" value={r.value}
                          checked={role === r.value}
                          onChange={(e) => setRole(e.target.value)}
                          className="peer sr-only" />
                        <div className={`py-2.5 px-2 rounded-xl border-2 text-center transition-all
                          ${role === r.value
                            ? "border-blue-500 bg-blue-50 shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
                            : "border-slate-100 bg-slate-50 hover:border-slate-200"}`}>
                          <p className={`text-xs font-bold leading-tight ${role === r.value ? "text-blue-600" : "text-slate-500"}`}>{r.label}</p>
                          <p className={`text-[9px] mt-0.5 ${role === r.value ? "text-blue-400" : "text-slate-400"}`}>{r.sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">ชื่อผู้ใช้ หรือ อีเมล</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
                      placeholder="กรอกชื่อผู้ใช้" required />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <label className="text-xs font-semibold text-slate-600">รหัสผ่าน</label>
                    <a href="#" className="text-xs text-blue-500 hover:text-blue-600 transition-colors font-medium">ลืมรหัสผ่าน?</a>
                  </div>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
                      placeholder="••••••••" required />
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-3.5 h-3.5 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  <label htmlFor="remember" className="text-xs text-slate-500 cursor-pointer hover:text-slate-600 transition-colors select-none">
                    จดจำฉันไว้ 30 วัน
                  </label>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 mt-1"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
                  {isLoading
                    ? <><Loader2 size={16} className="animate-spin" /> กำลังตรวจสอบ...</>
                    : <>เข้าสู่ระบบ <ArrowRight size={15} strokeWidth={2.5} /></>}
                </button>
              </form>

              <p className="text-center text-[11px] text-slate-300 mt-6">
                &copy; 2026 POSNET Co., Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
