import { useState } from "react"

export default function Login({ onLogin }: { onLogin: (pass: string) => void }) {
  const [pass, setPass] = useState("")

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50 gap-8">
      {/* Credentials hint for reviewer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 w-64 text-sm">
        <p className="font-semibold text-amber-800 mb-3">Demo Credentials</p>
        <div className="space-y-1.5 text-amber-700">
          <div className="flex justify-between">
            <span className="text-amber-500">Username</span>
            <span className="font-mono font-medium">admin</span>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-500">Password</span>
            <span className="font-mono font-medium">admin123</span>
          </div>
        </div>
      </div>

      {/* Login card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">HRMS Lite</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to continue</p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onLogin(pass)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            />
          </div>
          <button
            onClick={() => onLogin(pass)}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
