import { Trash2 } from "lucide-react"
import { useEmployees, useDeleteEmployee } from "../../hooks/useEmployees"
import type { Employee } from "../../types"

export default function EmployeeTable() {
  const { data, isLoading, error } = useEmployees()
  const deleteMutation = useDeleteEmployee()

  const handleDelete = (emp: Employee) => {
    if (window.confirm(`Delete ${emp.full_name}?`)) {
      deleteMutation.mutate(emp.employee_id)
    }
  }

  if (isLoading) return <p className="text-sm text-slate-500 py-4">Loading...</p>
  if (error) return <p className="text-sm text-red-500 py-4">Error loading employees</p>

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {!data?.length ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          No employees yet. Add one above.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Department</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr key={emp.employee_id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{emp.employee_id}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{emp.full_name}</td>
                <td className="px-4 py-3 text-slate-600">{emp.email}</td>
                <td className="px-4 py-3 text-slate-600">{emp.department}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(emp)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete employee"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
