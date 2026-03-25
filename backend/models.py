import uuid
from sqlalchemy import Column, String, Date, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from .database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(String, unique=True, nullable=False, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # CASCADE : if emp is deleted -> attendnce history is droped
    employee_ref_id = Column(UUID(as_uuid=True), ForeignKey("employees.id", ondelete="CASCADE"))
    date = Column(Date, nullable=False)
    status = Column(String, nullable=False) # Present/Absent


    __table_args__ = (UniqueConstraint('employee_ref_id', 'date', name='_employee_date_uc'),)