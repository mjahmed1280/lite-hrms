import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getEmployees, createEmployee, deleteEmployee } from "../api/employees"
import { getAttendance } from "../api/attendance"
import type { Employee } from "../types"

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}

export const useAttendance = (empId: string | null) => {
  return useQuery({
    queryKey: ["attendance", empId],
    queryFn: () => getAttendance(empId!),
    enabled: !!empId,
  })
}
