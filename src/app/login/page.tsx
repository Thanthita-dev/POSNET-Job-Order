"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Lock, User, ArrowRight, Loader2, Building2, Users2, 
  ShieldCheck, Zap, CheckCircle2, HeadphonesIcon, 
  Sparkles, Sun, Moon, Globe 
} from "lucide-react";

/* ── Content Dictionary ── */
const content = {
  TH: {
    welcome: "ยินดีต้อนรับ",
    subWelcome: "เข้าสู่ระบบเพื่อจัดการงานเทคนิค",
    securePortal: "พอร์ทัลความปลอดภัย",
    username: "ชื่อผู้ใช้งาน / อีเมล",
    password: "รหัสผ่าน",
    remember: "จดจำฉันไว้",
    forgot: "ลืมรหัสผ่าน?",
    continue: "เข้าสู่ระบบ",
    verifying: "กำลังตรวจสอบ",
    support: "ติดต่อฝ่ายเทคนิค",
    fieldService: "ระบบบริหารจัดการงานภาคสนาม",
    roles: { company: "ผู้ดูแล", customer: "ลูกค้า", staff: "ช่าง" },
    analytics: "วิเคราะห์ข้อมูล",
    urgent: "เร่งด่วน",
    allJobs: "งานทั้งหมด"
  },
  EN: {
    welcome: "Welcome",
    subWelcome: "Sign in to manage operations",
    securePortal: "Secure Portal",
    username: "Username / Email",
    password: "Password",
    remember: "Stay signed in",
    forgot: "Forgot?",
    continue: "CONTINUE",
    verifying: "VERIFYING",
    support: "Contact Support",
    fieldService: "Field Service Infrastructure",
    roles: { company: "Admin", customer: "Client", staff: "Staff" },
    analytics: "Analytics",
    urgent: "URGENT",
    allJobs: "JOBS"
  }
};

/* ── Floating mock dashboard card ─────────────────────────── */
function MockDashboard({ isDark, lang }: { isDark: boolean, lang: "TH" | "EN" }) {
  const t = content[lang];
  return (
    <div
      className="w-[300px] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-float"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.85))"
          : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(241,245,249,0.9))",
        backdropFilter: "blur(20px)",
        transform: "perspective(1200px) rotateY(-10deg) rotateX(5deg)",
      }}
    >
      <div className={`flex items-center gap-2 px-5 py-3 border-b ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50/50"}`}>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/80" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
        </div>
        <span className={`flex-1 text-center text-[8px] font-black tracking-[0.2em] uppercase ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.analytics}</span>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t.allJobs, val: "47", color: "#3b82f6" },
            { label: "SLA", val: "94%", color: "#10b981" },
            { label: t.urgent, val: "3", color: "#f59e0b" },
          ].map((s, idx) => (
            <div key={s.label} className={`rounded-xl p-2 border transition-all duration-700 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] ${isDark ? "border-white/10 bg-white/5" : "border-slate-100 bg-slate-50"}`} style={{ animationDelay: `${0.8 + idx * 0.1}s` }}>
              <p className="text-[12px] font-black" style={{ color: s.color }}>{s.val}</p>
              <p className={`text-[6px] font-black mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-xl p-3 border opacity-0 animate-[fade-in_0.5s_ease-out_forwards] ${isDark ? "border-white/10 bg-white/5" : "border-slate-100 bg-slate-50"}`} style={{ animationDelay: "1.1s" }}>
          <div className="flex items-end gap-1.5 h-10">
            {[40, 70, 45, 90, 65, 100, 55].map((v, i) => (
              <div key={i} className="flex-1 rounded-full transition-all duration-1000"
                style={{ 
                  height: `${v}%`, 
                  background: i === 5 
                    ? "linear-gradient(to top, #3b82f6, #60a5fa)" 
                    : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" 
                }} />
            ))}
          </div>
        </div>

        <div className="space-y-1.5 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: "1.3s" }}>
          {[
            { name: "Starbucks · Silom", dot: "#10b981" },
            { name: "Apple Store · CW", dot: "#3b82f6" },
          ].map((j, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg border ${isDark ? "border-white/5 bg-white/5" : "border-slate-100 bg-slate-50"}`}>
              <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: j.dot, boxShadow: `0 0 6px ${j.dot}` }} />
              <span className={`text-[9px] font-bold flex-1 truncate ${isDark ? "text-slate-400" : "text-slate-600"}`}>{j.name}</span>
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

  const [isDark, setIsDark] = useState(false); // Default to Light Mode
  const [lang, setLang] = useState<"TH" | "EN">("TH");
  const [role, setRole] = useState("company");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    return () => document.documentElement.classList.remove('dark-theme');
  }, [isDark]);

  const t = content[lang];

  useEffect(() => {
    switch (role) {
      case "company":  setUsername("admin@posnet.com");   setPassword("••••••••"); break;
      case "customer": setUsername("client@retail.com"); setPassword("••••••••"); break;
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
    { value: "company",  label: t.roles.company, icon: <Building2 size={18} /> },
    { value: "customer", label: t.roles.customer, icon: <Users2 size={18} /> },
    { value: "staff",    label: t.roles.staff, icon: <Zap size={18} /> },
  ];

  return (
    <div className={`h-screen min-h-[600px] flex flex-col lg:flex-row font-sans overflow-hidden transition-colors duration-1000 ${isDark ? "bg-[#05070a]" : "bg-[#f8fafc]"}`}>

      {/* ── Fixed Controls (Top Right) ── */}
      <div className="fixed top-6 right-6 z-[100] flex gap-3 animate-[fade-in_1s_ease-out_forwards]">
        {/* Language Switcher */}
        <button 
          onClick={() => setLang(lang === "TH" ? "EN" : "TH")}
          className={`h-10 px-4 rounded-full flex items-center gap-2 transition-all duration-500 shadow-lg font-black text-[10px] tracking-widest active:scale-95 ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-slate-800 hover:shadow-2xl border border-slate-200"}`}
        >
          <Globe size={14} className="text-blue-500" />
          {lang}
        </button>

        {/* Theme Switcher */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg active:scale-90 ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-slate-800 hover:shadow-2xl border border-slate-200"}`}
        >
          {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
        </button>
      </div>

      {/* ── Background Global Elements ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[100px] animate-pulse-glow transition-all duration-1000 ${isDark ? "bg-blue-600/10 scale-100" : "bg-blue-400/5 scale-110"}`} />
        <div className={`absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[100px] animate-pulse-glow [animation-delay:2s] transition-all duration-1000 ${isDark ? "bg-indigo-600/10 scale-100" : "bg-indigo-400/5 scale-110"}`} />
      </div>

      {/* ── Left visual panel ─────────────────────── */}
      <div className={`relative lg:w-1/2 flex flex-col items-center justify-center overflow-hidden shrink-0 min-h-[350px] lg:h-full transition-colors duration-1000 ${isDark ? "bg-[#05070a]" : "bg-slate-50"}`}>
        <div className={`absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} 
             style={{ backgroundImage: `radial-gradient(circle, ${isDark ? "#3b82f6" : "#64748b"} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />

        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Brand Identity */}
          <div className="mb-8 relative group animate-[slide-in-left_0.8s_ease-out_forwards]">
            <div className={`absolute -inset-8 rounded-full blur-2xl opacity-40 transition-colors duration-1000 ${isDark ? "bg-blue-500/20" : "bg-blue-400/10"}`} />
            <div className={`relative w-16 h-16 rounded-[1.8rem] flex items-center justify-center border backdrop-blur-xl transition-all duration-700 group-hover:rotate-[10deg] group-hover:scale-110 shadow-xl ${isDark ? "bg-white/5 border-white/20" : "bg-white border-slate-200"}`}>
              <span className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>P</span>
              <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles size={10} className="text-white" />
              </div>
            </div>
            <div className="mt-4">
              <h1 className={`text-2xl font-black tracking-[0.3em] transition-colors duration-1000 ${isDark ? "text-white" : "text-slate-900"}`}>POSNET</h1>
              <div className="h-1 w-10 bg-blue-600 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
            </div>
          </div>

          {/* Visualization */}
          <div className="relative scale-90 lg:scale-100 transition-all duration-1000 animate-[scale-in_1s_ease-out_forwards]">
            <div className={`absolute -inset-16 rounded-full blur-[80px] animate-pulse transition-colors duration-1000 ${isDark ? "bg-blue-600/5" : "bg-blue-400/10"}`} />
            <MockDashboard isDark={isDark} lang={lang} />
          </div>
          
          <p className={`mt-8 text-[9px] font-black tracking-[0.4em] uppercase transition-colors duration-1000 animate-[fade-in_1.5s_ease-out_forwards] ${isDark ? "text-blue-300/20" : "text-slate-400"}`}>{t.fieldService}</p>
        </div>
      </div>

      {/* ── Right form panel ────────────────────────── */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-8 relative lg:h-full">
        <div className="relative w-full max-w-[400px]">
          {/* Form Card */}
          <div className={`relative backdrop-blur-[30px] border rounded-[3rem] p-8 lg:p-10 shadow-2xl overflow-hidden transition-all duration-1000 animate-[slide-in-right_0.8s_ease-out_forwards] ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white/80 border-slate-200 shadow-slate-200/50"}`}>
            
            <div className="relative z-10">
              <header className="mb-8 animate-[fade-in_1s_ease-out_forwards_0.3s] opacity-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isDark ? "text-blue-400" : "text-blue-600"}`}>{t.securePortal}</span>
                </div>
                <h2 className={`text-3xl font-black mb-1 transition-colors duration-700 ${isDark ? "text-white" : "text-slate-900"}`}>{t.welcome}</h2>
                <p className={`font-medium text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.subWelcome}</p>
              </header>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Role selection */}
                <div className="grid grid-cols-3 gap-3 animate-[fade-in_1s_ease-out_forwards_0.5s] opacity-0">
                  {roles.map((r) => (
                    <label key={r.value} className="cursor-pointer group">
                      <input type="radio" name="role" value={r.value}
                        checked={role === r.value}
                        onChange={(e) => setRole(e.target.value)}
                        className="peer sr-only" />
                      <div className={`flex flex-col items-center gap-2 py-3.5 rounded-[1.5rem] border transition-all duration-500
                        ${role === r.value
                          ? "bg-blue-600 border-blue-400 shadow-[0_10px_20px_rgba(37,99,235,0.2)] scale-105"
                          : isDark 
                            ? "bg-white/5 border-white/10 hover:border-white/20 text-slate-500" 
                            : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-400"}`}>
                        <div className={`${role === r.value ? "text-white" : "group-hover:text-blue-500 transition-transform group-hover:scale-110"}`}>
                          {r.icon}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${role === r.value ? "text-white" : "group-hover:text-slate-700"}`}>{r.label}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="space-y-4 animate-[fade-in_1s_ease-out_forwards_0.7s] opacity-0">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <User size={18} />
                    </div>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                      className={`w-full pl-14 pr-6 py-4 rounded-full text-xs font-semibold transition-all border outline-none
                        ${isDark 
                          ? "bg-white/5 border-white/10 text-white placeholder:text-slate-700 focus:border-blue-500/50" 
                          : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:shadow-inner"}`}
                      placeholder={t.username} required />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-14 pr-6 py-4 rounded-full text-xs font-semibold transition-all border outline-none
                        ${isDark 
                          ? "bg-white/5 border-white/10 text-white placeholder:text-slate-700 focus:border-blue-500/50" 
                          : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:shadow-inner"}`}
                      placeholder={t.password} required />
                  </div>
                </div>

                <div className="flex items-center justify-between px-3 animate-[fade-in_1s_ease-out_forwards_0.8s] opacity-0">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="sr-only peer" />
                    <div className={`w-5 h-5 border rounded-lg flex items-center justify-center transition-all 
                      ${isDark ? "border-white/20 peer-checked:bg-blue-600" : "border-slate-300 peer-checked:bg-blue-600"}`}>
                      <CheckCircle2 size={12} className={`text-white transition-opacity ${rememberMe ? "opacity-100" : "opacity-0"}`} />
                    </div>
                    <span className={`text-[10px] font-bold ${isDark ? "text-slate-500 group-hover:text-slate-300" : "text-slate-500 group-hover:text-slate-700"}`}>{t.remember}</span>
                  </label>
                  <button type="button" className="text-[10px] font-black text-blue-600 hover:text-blue-500 uppercase tracking-widest">{t.forgot}</button>
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full group relative py-4.5 rounded-full font-black text-xs text-white overflow-hidden transition-all active:scale-[0.98] disabled:opacity-70 animate-[fade-in_1s_ease-out_forwards_1s] opacity-0"
                  style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", boxShadow: "0 15px 30px rgba(37,99,235,0.25)" }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <div className="relative flex items-center justify-center gap-2.5 tracking-[0.1em]">
                    {isLoading ? (
                      <><Loader2 size={18} className="animate-spin" /> {t.verifying}</>
                    ) : (
                      <>{t.continue} <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </div>
                </button>
              </form>

              <footer className="mt-8 flex flex-col items-center gap-4 animate-[fade-in_1s_ease-out_forwards_1.2s] opacity-0">
                <button className={`flex items-center gap-2 transition-colors group ${isDark ? "text-slate-700 hover:text-slate-500" : "text-slate-300 hover:text-slate-500"}`}>
                  <HeadphonesIcon size={14} />
                  <span className="text-[9px] font-black uppercase tracking-[0.15em]">{t.support}</span>
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
