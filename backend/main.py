import os
from fastapi import FastAPI, Depends, HTTPException, Header, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, database

# creates tables if they dont exist
try:
    models.Base.metadata.create_all(bind=database.engine)
except Exception as e:
    print("db conn error: Check Supabase")

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Front end URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

def verify_admin(x_admin_password: str = Header(None)):
    if x_admin_password != SECRET_ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

# --- EMPLOYEES ---
@app.get("/employees", response_model=list[schemas.EmployeeRead])
def list_employees(db: Session = Depends(database.get_db)):
    return db.query(models.Employee).all()

@app.post("/employees", response_model=schemas.EmployeeRead)
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    if db.query(models.Employee).filter(models.Employee.employee_id == emp.employee_id).first():
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    
    new_emp = models.Employee(**emp.model_dump())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp

@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: str, db: Session = Depends(database.get_db)):
    db_emp = db.query(models.Employee).filter(models.Employee.employee_id == emp_id).first()
    if not db_emp:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_emp)
    db.commit()
    return {"message": "Deleted"}

# --- ATTENDANCE ---

@app.post("/attendance")
def mark_attendance(req: schemas.AttendanceCreate, db: Session = Depends(database.get_db)):
    emp = db.query(models.Employee).filter(models.Employee.employee_id == req.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Upsert logic: Update if exists, otherwise create
    record = db.query(models.Attendance).filter(
        models.Attendance.employee_ref_id == emp.id, 
        models.Attendance.date == req.date
    ).first()

    if record:
        record.status = req.status
    else:
        record = models.Attendance(employee_ref_id=emp.id, date=req.date, status=req.status)
        db.add(record)
    
    db.commit()
    return {"status": "success"}

@app.get("/attendance/{emp_id}", response_model=list[schemas.AttendanceRead])
def get_attendance(emp_id: str, db: Session = Depends(database.get_db)):
    emp = db.query(models.Employee).filter(models.Employee.employee_id == emp_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db.query(models.Attendance).filter(models.Attendance.employee_ref_id == emp.id).all()