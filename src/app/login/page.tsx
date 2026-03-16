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
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left Panel - Branding (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
              P
            </div>
            <span className="text-2xl font-bold tracking-widest">POSNET</span>
          </div>
          
          <h1 className="text-5xl font-extrabold leading-tight mt-12 mb-6">
            ระบบจัดการ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              ใบสั่งงาน (Job Order)
            </span> <br />
            อัจฉริยะ
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            ติดตาม SLA ตรวจสอบตำแหน่งช่าง และจัดการงานซ่อมบำรุงอย่างมีประสิทธิภาพในศูนย์ควบคุมเดียว
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck className="text-emerald-400" size={28} />
            <h3 className="font-bold text-lg">ปลอดภัย & แยกข้อมูลชัดเจน</h3>
          </div>
          <p className="text-sm text-slate-300">
            ระบบรักษาความปลอดภัยระดับองค์กร มั่นใจได้ว่าบัญชีบริษัทและลูกค้าจะเข้าถึงได้เฉพาะข้อมูลที่ได้รับสิทธิ์เท่านั้น
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
            P
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-wider">POSNET</span>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">ยินดีต้อนรับ</h2>
            <p className="text-slate-500">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
            <p className="text-xs font-semibold text-blue-600 mt-2 bg-blue-50 inline-block px-3 py-1 rounded-full lg:hidden">
              📱 มุมมองแอปมือถือ
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Account Type Selection (Demo Purpose) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">ตัวอย่าง: เลือกสิทธิ์เพื่อกรอกข้อมูลอัตโนมัติ</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer">
                  <input type="radio" name="role" value="company" checked={role === 'company'} onChange={(e) => setRole(e.target.value)} className="peer sr-only" />
                  <div className="p-3 rounded-xl border-2 border-slate-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all text-center">
                    <span className="text-sm font-bold text-slate-700 peer-checked:text-blue-700">บริษัท / ผู้ใช้ (Company)</span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="role" value="customer" checked={role === 'customer'} onChange={(e) => setRole(e.target.value)} className="peer sr-only" />
                  <div className="p-3 rounded-xl border-2 border-slate-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all text-center">
                    <span className="text-sm font-bold text-slate-700 peer-checked:text-blue-700">ลูกค้า (Customer)</span>
                  </div>
                </label>
                <label className="cursor-pointer col-span-2">
                  <input type="radio" name="role" value="staff" checked={role === 'staff'} onChange={(e) => setRole(e.target.value)} className="peer sr-only" />
                  <div className="p-3 rounded-xl border-2 border-slate-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all text-center flex items-center justify-center gap-2">
                    <span className="text-sm font-bold text-slate-700 peer-checked:text-blue-700">ช่างเทคนิค / Outsource (แอปมือถือ)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อผู้ใช้ หรือ อีเมล</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-slate-400" size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                  placeholder="กรอกชื่อผู้ใช้ของคุณ"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">รหัสผ่าน</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">ลืมรหัสผ่าน?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-slate-400" size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-slate-600 cursor-pointer">
                จดจำฉันไว้ 30 วัน
              </label>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> กำลังเข้าสู่ระบบ...
                </>
              ) : (
                <>
                  เข้าสู่ระบบ <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Mobile Biometrics (Only shows when Staff is selected to simulate Mobile App) */}
            {role === 'staff' && (
              <div className="pt-4 border-t border-slate-100 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-xs font-semibold text-slate-500 mb-4">หรือเข้าสู่ระบบแบบรวดเร็ว</p>
                <div className="flex justify-center gap-4">
                  <button type="button" onClick={handleLogin} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-slate-100 hover:border-blue-300 transition-all text-slate-600 hover:text-blue-600">
                    <ScanFace size={28} strokeWidth={1.5} />
                  </button>
                  <button type="button" onClick={handleLogin} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-slate-100 hover:border-blue-300 transition-all text-slate-600 hover:text-blue-600">
                    <Fingerprint size={28} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-xs font-medium text-slate-400 mt-8">
            &copy; 2026 POSNET สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </div>
  );
}
