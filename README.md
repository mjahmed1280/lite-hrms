# HRMS Lite

A lightweight Human Resource Management System for managing employee records and daily attendance.

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- TanStack Query (data fetching & caching)
- React Hook Form + Zod (form validation)
- Axios

**Backend**
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL (hosted on Supabase)
- Pydantic v2

**Deployment**
- Frontend: Vercel
- Backend: Render

## Running Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env`:
```
DATABASE_URL=your_postgres_connection_string
ADMIN_PASSWORD=admin123
```

```bash
uvicorn main:app --reload
```

API runs at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

App runs at `http://localhost:5173`

**Demo login password:** `admin123`

## Features

- Add, view, and delete employees
- Mark daily attendance (Present / Absent / Late) with date picker
- View attendance history per employee with date filter
- Total present days count per employee
- Department and employee count summary

## Assumptions

- Single admin user — no user management or role-based access
- Authentication is a simple password gate, not a full auth system
- Attendance is marked per employee per day (duplicate submissions update the existing record)
- Leave management and payroll are out of scope
