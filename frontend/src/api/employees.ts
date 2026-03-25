import { api } from "./client"
import type { Employee } from "../types"

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await api.get("/employees")
  return res.data
}

export const createEmployee = async (data: Omit<Employee, never>): Promise<Employee> => {
  const res = await api.post("/employees", data)
  return res.data
}

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete(`/employees/${id}`)
}
