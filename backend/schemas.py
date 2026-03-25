from pydantic import BaseModel, EmailStr
from datetime import date
from uuid import UUID
from typing import List

# DTOs

class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeRead(EmployeeBase):
    id: UUID
    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    employee_id: str  # user id (like EMP001
    date: date
    status: str       # can be Present/Absent

class AttendanceRead(BaseModel):
    date: date
    status: str
    class Config:
        from_attributes = True