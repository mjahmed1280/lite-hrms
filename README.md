# Lite-HRMS

A streamlined Human Resource Management System for lightning-fast employee management and attendance tracking.

## Live Links

| | Link |
|---|---|
| **Frontend** | https://lite-hrms-psi.vercel.app/  |
| **Backend API** (hosted on GCP Clour run) | https://lite-hrms-backend-1033451712585.asia-south1.run.app |
| **API Docs (Swagger)** | https://lite-hrms-backend-1033451712585.asia-south1.run.app/docs |
| **GitHub** | https://github.com/mjahmed1280/lite-hrms |

---

## Tech Stack

| Layer | Tech | Role |
|---|---|---|
| **Frontend** | React 19 + TypeScript + Vite | SPA with fast HMR |
| **Styling** | Tailwind CSS | Utility-first styling |
| **State / Fetching** | TanStack Query + Axios | Server state caching & data fetching |
| **Forms** | React Hook Form + Zod | Type-safe form validation |
| **Frontend Host** | Vercel | Global edge CDN |
| **Backend** | FastAPI (Python) | REST API with auto Swagger docs at `/docs` |
| **ORM** | SQLAlchemy + Pydantic v2 | DB access and schema validation |
| **Backend Host** | Google Cloud Run | Containerised, scalable serverless |
| **Database** | PostgreSQL via Supabase | Managed, encrypted relational DB |

---

## Features

- Add, view, and delete employees
- Mark daily attendance (Present / Absent / Late) with date picker
- View attendance history per employee with date filter
- Total present days count per employee
- Department and employee count summary

---

## Run Locally

### Prerequisites

- Node.js >= 18
- Python >= 3.11
- A Supabase project with the schema applied

### Backend

```bash
cd backend

python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env


uvicorn main:app --reload --port 8000
```

API: `http://localhost:8000` 
Swagger: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend

npm install

cp .env.example .env
# Edit .env — set VITE_API_URL and VITE_ADMIN_PASSWORD

npm run dev
```

App: `http://localhost:5173`

**Demo login password:** `admin123`

---

## Environment Variables

### `backend/.env`

| Variable | Description |
|---|---|
| `DATABASE_URL` | Full Supabase PostgreSQL connection string |
| `ADMIN_PASSWORD` | Admin password for the dashboard login |

See [backend/.env.example](backend/.env.example)

### `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (`http://localhost:8000` locally) |
| `VITE_ADMIN_PASSWORD` | Must match `ADMIN_PASSWORD` in backend |

See [frontend/.env.example](frontend/.env.example)

---

## Project Structure

```
lite-HRMS/
├── backend/
│   ├── main.py          # FastAPI app, routes, CORS
│   ├── models.py        # SQLAlchemy ORM models
│   ├── schemas.py       # Pydantic request/response schemas
│   ├── database.py      # DB session setup
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── cloudbuild.yaml  # GCP Cloud Build CI/CD
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── pages/       # Login, Dashboard, etc.
    │   └── App.tsx
    ├── index.html
    └── .env.example
```

---

## Deployment

### Backend -> Google Cloud Run

Containerised via `Dockerfile`, deployed with Cloud Build:

```bash
gcloud builds submit --config backend/cloudbuild.yaml
```

### Frontend -> Vercel

Connect your GitHub repo to Vercel, set root directory to `frontend/`, then add env vars in the Vercel dashboard:

| Var | Value |
|---|---|
| `VITE_API_URL` | Your Cloud Run service URL |
| `VITE_ADMIN_PASSWORD` | Your admin password |

---

## Assumptions

- Single admin user — no user management or role-based access
- Authentication is a simple password gate, not a full auth system
- Attendance is marked per employee per day (duplicate submissions update the existing record)
- Leave management and payroll are out of scope
