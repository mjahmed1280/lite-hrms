import { useState } from "react"
import { useEmployees, useAttendance } from "../hooks/useEmployees"
import { api } from "../api/client"
import type { AttendanceRecord, Employee } from "../types"

type StatusMap = Record<string, AttendanceRecord["status"]>

const statusBadge: Record<AttendanceRecord["status"], string> = {
  Present: "bg-green-100 text-green-700",
  Absent: "bg-red-100 text-red-700",
  Late: "bg-amber-100 text-amber-700",
}

export default function Attendance() {
  const { data: employees, isLoading } = useEmployees()
  const [attendance, setAttendance] = useState<StatusMap>({})
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
  const [saving, setSaving] = useState(false)
  const [selectedEmp, setSelectedEmp] = useState("")
  const [filterDate, setFilterDate] = useState("")

  const { data: records, isLoading: recordsLoading, error: recordsError } = useAttendance(selectedEmp || null)

  const filteredRecords = filterDate
    ? records?.filter((r) => r.date === filterDate)
    : records

  const presentCount = records?.filter((r) => r.status === "Present").length ?? 0

  const handleChange = (id: string, status: AttendanceRecord["status"]) => {
    setAttendance((prev) => ({ ...prev, [id]: status }))
  }

  const saveAttendance = async () => {
    if (!employees) return
    setSaving(true)
    try {
      await Promise.all(
        employees.map((emp: Employee) =>
          api.post("/attendance", {
            employee_id: emp.employee_id,
            status: attendance[emp.employee_id] ?? "Absent",
            date,
          })
        )
      )
      alert("Attendance saved!")
    } catch {
      alert("Failed to save attendance.")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <p className="text-sm text-slate-500 py-4">Loading...</p>

  return (
    <div className="space-y-6">

      {/* Mark Attendance */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-900">Mark Attendance</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {!employees?.length ? (
            <div className="py-16 text-center text-slate-400 text-sm">No employees found.</div>
          ) : (
            <>
              {employees.map((emp: Employee) => {
                const status = attendance[emp.employee_id] ?? "Absent"
                return (
                  <div
                    key={emp.employee_id}
                    className="flex items-center justify-between px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{emp.full_name}</p>
                      <p className="text-xs text-slate-400">{emp.department}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge[status]}`}>
                        {status}
                      </span>
                      <select
                        value={status}
                        onChange={(e) =>
                          handleChange(emp.employee_id, e.target.value as AttendanceRecord["status"])
                        }
                        className="text-sm border border-slate-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-black outline-none"
                      >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Late</option>
                      </select>
                    </div>
                  </div>
                )
              })}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                <button
                  onClick={saveAttendance}
                  disabled={saving}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Attendance"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Attendance Records */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900 shrink-0">Attendance Records</h2>
          <div className="flex items-center gap-2 ml-auto">
            <select
              value={selectedEmp}
              onChange={(e) => { setSelectedEmp(e.target.value); setFilterDate("") }}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
            >
              <option value="">Select employee...</option>
              {employees?.map((emp: Employee) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
            {selectedEmp && (
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
                title="Filter by date"
              />
            )}
            {filterDate && (
              <button
                onClick={() => setFilterDate("")}
                className="text-xs text-slate-400 hover:text-black transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {selectedEmp && !recordsLoading && !recordsError && records && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500">
              Total records: <span className="font-semibold text-slate-800">{records.length}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              Days present: <span className="font-semibold text-green-700">{presentCount}</span>
            </span>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {!selectedEmp ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              Select an employee to view their attendance history.
            </div>
          ) : recordsLoading ? (
            <div className="py-16 text-center text-slate-400 text-sm">Loading records...</div>
          ) : recordsError ? (
            <div className="py-16 text-center text-red-400 text-sm">Failed to load records.</div>
          ) : !filteredRecords?.length ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              {filterDate ? "No records for this date." : "No attendance records found."}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r) => (
                  <tr key={r.date} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">{r.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge[r.status as AttendanceRecord["status"]] ?? "bg-slate-100 text-slate-600"}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  )
}
