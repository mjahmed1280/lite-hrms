import { api } from "./client"
import type { AttendanceRecord } from "../types"

export type AttendanceEntry = Pick<AttendanceRecord, "date" | "status">

export const getAttendance = async (empId: string): Promise<AttendanceEntry[]> => {
  const res = await api.get(`/attendance/${empId}`)
  return res.data
}
