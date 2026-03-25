import { useState } from "react"
import { Plus, Users, Building2 } from "lucide-react"
import AddEmployeeForm from "../components/employee/AddEmployeeForm"
import EmployeeTable from "../components/employee/EmployeeTable"
import { useEmployees } from "../hooks/useEmployees"

export default function Employees() {
  const [showForm, setShowForm] = useState(false)
  const { data: employees } = useEmployees()

  const total = employees?.length ?? 0
  const departments = new Set(employees?.map((e) => e.department)).size

  return (
    <div className="space-y-5">

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm">
          <div className="bg-slate-100 rounded-lg p-2">
            <Users size={16} className="text-slate-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Employees</p>
            <p className="text-2xl font-bold text-slate-900">{total}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm">
          <div className="bg-slate-100 rounded-lg p-2">
            <Building2 size={16} className="text-slate-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Departments</p>
            <p className="text-2xl font-bold text-slate-900">{departments}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Employees</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          <Plus size={15} />
          {showForm ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {showForm && <AddEmployeeForm onSuccess={() => setShowForm(false)} />}

      <EmployeeTable />
    </div>
  )
}
