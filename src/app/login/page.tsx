"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldCheck, ArrowRight, Loader2, Fingerprint, ScanFace } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  // States
  const [role, setRole] = useState("company");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Demo Auto-fill effect
  useEffect(() => {
    switch (role) {
      case "company":
        setUsername("admin@company.com");
        setPassword("••••••••");
        break;
      case "customer":
        setUsername("client_a@retail.com");
        setPassword("••••••••");
        break;
      case "staff":
        setUsername("tech_somchai");
        setPassword("••••••••");
        break;
      default:
        setUsername("");
        setPassword("");
    }
  }, [role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and redirect with role parameter
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/?role=${role}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-emerald-100/50 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Panel - Branding (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#060b14] text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-float"></div>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-[0_0_20px_rgba(59,130,246,0.6)] text-white border border-white/10">
              P
            </div>
            <span className="text-3xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">POSNET</span>
          </div>
          
          <h1 className="text-6xl font-black leading-[1.1] mt-16 mb-8 tracking-tight">
            ระบบจัดการ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 drop-shadow-sm">
              ใบสั่งงาน (Job Order)
            </span> <br />
            อัจฉริยะ
          </h1>
          <p className="text-slate-300 text-lg max-w-md leading-relaxed font-medium">
            ยกระดับการให้บริการด้วยระบบติดตาม SLA แบบเรียลไทม์ ตรวจสอบพิกัดช่าง และจัดการงานซ่อมบำรุงอย่างมืออาชีพในศูนย์ควบคุมเดียว
          </p>
        </div>


      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            P
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-widest">POSNET</span>
        </div>

        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="text-center lg:text-left mb-10 relative z-10">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">ยินดีต้อนรับ</h2>
            <p className="text-slate-500 font-medium text-lg">เข้าสู่ระบบเพื่อจัดการงานของคุณ</p>
            <p className="text-xs font-bold text-blue-600 mt-4 bg-blue-50 border border-blue-100 inline-block px-4 py-1.5 rounded-full lg:hidden shadow-sm">
              📱 มุมมองแอปมือถือจำลอง
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {/* Account Type Selection (Demo Purpose) */}
            <div className="space-y-3 p-5 bg-slate-50/80 rounded-2xl border border-slate-100 shadow-inner">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                โหมดจำลอง: เลือกสิทธิ์การใช้งาน
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer group">
                  <input type="radio" name="role" value="company" checked={role === 'company'} onChange={(e) => setRole(e.target.value)} className="peer sr-only" />
                  <div className="p-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-md transition-all text-center group-hover:scale-[1.02]">
                    <span className="text-sm font-bold text-slate-600 peer-checked:text-blue-700">บริษัท / ผู้ใช้</span>
                  </div>
                </label>
                <label className="cursor-pointer group">
                  <input type="radio" name="role" value="customer" checked={role === 'customer'} onChange={(e) => setRole(e.target.value)} className="peer sr-only" />
                  <div className="p-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:shadow-md transition-all text-center group-hover:scale-[1.02]">
                    <span className="text-sm font-bold text-slate-600 peer-checked:text-emerald-700">ลูกค้า (Portal)</span>
                  </div>
                </label>
                <label className="cursor-pointer col-span-2 group">
                  <input type="radio" name="role" value="staff" checked={role === 'staff'} onChange={(e) => setRole(e.target.value)} className="peer sr-only" />
                  <div className="p-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:shadow-md transition-all text-center flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                    <span className="text-sm font-bold text-slate-600 peer-checked:text-indigo-700">ช่างเทคนิค (แอปมือถือ)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">ชื่อผู้ใช้ หรือ อีเมล</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:bg-white" 
                  placeholder="กรอกชื่อผู้ใช้ของคุณ"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1 mb-1">
                <label className="block text-sm font-bold text-slate-700">รหัสผ่าน</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">ลืมรหัสผ่าน?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:bg-white" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center ml-1">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 cursor-pointer transition-colors" 
              />
              <label htmlFor="remember" className="ml-2.5 text-sm font-bold text-slate-600 cursor-pointer select-none">
                จดจำฉันไว้ 30 วัน
              </label>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.4)] hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> กำลังตรวจสอบข้อมูล...
                </>
              ) : (
                <>
                  เข้าสู่ระบบ <ArrowRight size={20} strokeWidth={3} />
                </>
              )}
            </button>


          </form>

          <p className="text-center text-xs font-bold text-slate-400 mt-10 relative z-10">
            &copy; 2026 POSNET Co., Ltd. <br className="sm:hidden" />All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
