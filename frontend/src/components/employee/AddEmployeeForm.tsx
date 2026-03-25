import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateEmployee } from "../../hooks/useEmployees"

const schema = z.object({
  employee_id: z.string().min(1, "ID is required"),
  full_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  department: z.string().min(1, "Department is required"),
})

type FormData = z.infer<typeof schema>

interface AddEmployeeFormProps {
  onSuccess?: () => void
}

export default function AddEmployeeForm({ onSuccess }: AddEmployeeFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const mutation = useCreateEmployee()

  const onSubmit = (data: FormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset()
        onSuccess?.()
      },
    })
  }

  const inputClass = "px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all w-full text-sm"
  const labelClass = "text-sm font-medium text-slate-700"
  const errorClass = "text-xs text-red-500 mt-0.5"

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-slate-700 mb-4">New Employee</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Employee ID</label>
          <input placeholder="e.g. EMP001" {...register("employee_id")} className={inputClass} />
          {errors.employee_id && <p className={errorClass}>{errors.employee_id.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Full Name</label>
          <input placeholder="e.g. Jane Smith" {...register("full_name")} className={inputClass} />
          {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Email</label>
          <input placeholder="e.g. jane@company.com" {...register("email")} className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Department</label>
          <input placeholder="e.g. Engineering" {...register("department")} className={inputClass} />
          {errors.department && <p className={errorClass}>{errors.department.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
      >
        {mutation.isPending ? "Adding..." : "Add Employee"}
      </button>
    </form>
  )
}
