export interface Employee {
  employee_id: string
  full_name: string
  email: string
  department: string
}

export interface AttendanceRecord {
  employee_id: string
  status: "Present" | "Absent" | "Late"
  date: string
}
