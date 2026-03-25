import { useState } from "react"
import { Database } from "lucide-react"

export default function Login({ onLogin }: { onLogin: (pass: string) => void }) {
  const [pass, setPass] = useState("")

  return (
    <div className="h-screen w-screen flex bg-white font-sans">

      {/* LEFT - Info Panel */}
      <div className="hidden md:flex w-2/5 flex-col justify-between bg-gradient-to-br from-[#1a1a4e] via-[#2d2d8f] to-[#3b3bb5] p-12 relative overflow-hidden">
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white/30 rounded-3xl"
              style={{
                width: "300px", height: "300px",
                top: `${i * 40 - 60}px`, right: `${i * 30 - 100}px`,
                transform: "rotate(20deg)",
              }}
            />
          ))}
        </div>

        {/* Top content */}
        <div className="z-10">
          {/* Asterisk icon */}
          <div className="w-12 h-12 mb-10">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
            </svg>
          </div>

          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Hello<br />LiteHRMS! 👋
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
            A lightweight HR Management System for managing employee records and daily attendance. .
          </p>
        </div>

        {/* Infrastructure badges */}
        <div className="z-10 space-y-2.5">
          {/* <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-3">Built on</p> */}

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
            <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">GitHub</p>
              <a href="https://github.com/mjahmed1280/lite-hrms" target="_blank" className="text-blue-300 text-[11px] hover:underline">
                mjahmed1280/lite-hrms
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
            <img src="https://cdn.simpleicons.org/vercel/white" alt="Vercel" className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">Vercel</p>
              <p className="text-blue-300 text-[11px]">Frontend hosting &amp; global CDN</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
            <img src="https://cdn.simpleicons.org/googlecloud/white" alt="GCP" className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">Google Cloud Run</p>
              <a href="https://lite-hrms-backend-1033451712585.asia-south1.run.app/docs" target="_blank" className="text-blue-300 text-[11px] hover:underline">
                API Docs →
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
            <img src="https://cdn.simpleicons.org/fastapi/white" alt="FastAPI" className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">FastAPI</p>
              <p className="text-blue-300 text-[11px]">Python backend · Swagger auto-docs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
            <Database className="w-4 h-4 text-white shrink-0" />
            <div>
              <p className="text-white text-xs font-semibold">Supabase Postgres</p>
              <p className="text-blue-300 text-[11px]">Encrypted managed database</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT - Login Form */}
      {/* RIGHT - Glassmorphic Login Form */}
      <div className="flex-1 flex items-center justify-center bg-blue-50/50 relative px-8">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"></div>

        {/* The Card (Glassmorphic) */}
        <div className="w-full max-w-sm z-10 p-10 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xl shadow-blue-900/10">
          <p className="text-blue-600 text-xs font-bold mb-8 uppercase">Lite HRMS</p>

          <h1 className="text-3xl font-black text-slate-900 mb-1">Welcome Back!</h1>
          <p className="text-slate-500 text-sm mb-10 font-medium">Please use 'admin123' as Admin Creds</p>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Password</label>
              <input
                type="password"
                placeholder="admin123"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onLogin(pass)}
                className="mt-2 w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white/50 text-slate-900 text-sm shadow-sm"
              />
            </div>

            <button
              onClick={() => onLogin(pass)}
              className="w-full bg-[#2d2d8f] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#1a1a4e] shadow-lg shadow-blue-900/20 active:scale-[0.97] transition-all mt-4"
            >
              Access Dashboard
            </button>
            
          </div>
        </div>
      </div>

    </div>
  )
}