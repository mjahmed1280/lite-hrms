import { Link, useLocation } from "react-router-dom"

interface NavbarProps {
  onLogout: () => void
}

export default function Navbar({ onLogout }: NavbarProps) {
  const { pathname } = useLocation()

  const linkClass = (path: string) =>
    `text-sm font-medium pb-1 transition-colors ${
      pathname === path
        ? "border-b-2 border-black text-black"
        : "text-slate-500 hover:text-black"
    }`

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-sm tracking-tight">HRMS Lite</span>
          <nav className="flex gap-5">
            <Link to="/" className={linkClass("/")}>Employees</Link>
            <Link to="/attendance" className={linkClass("/attendance")}>Attendance</Link>
          </nav>
        </div>
        <button
          onClick={onLogout}
          className="text-sm text-slate-500 hover:text-black transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
