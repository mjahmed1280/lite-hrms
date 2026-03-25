import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Employees from "./pages/Employees"
import Attendance from "./pages/Attendance"
import Login from "./pages/Login"

function App() {
  const [isAuthed, setIsAuthed] = useState(
    () => localStorage.getItem("authed") === "1"
  )

  const handleLogin = (pass: string) => {
    if (pass === "admin123") {
      localStorage.setItem("authed", "1")
      setIsAuthed(true)
    } else {
      alert("Incorrect password")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authed")
    setIsAuthed(false)
  }

  if (!isAuthed) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar onLogout={handleLogout} />
        <main className="max-w-5xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
