# SpendWise 💸

> A full-stack single-page expense tracking application with authentication, live search, and an admin panel.

---

## Problem Statement

Managing personal finances is difficult without visibility into spending patterns.
SpendWise gives users a real-time, categorised view of where their money goes —
with full CRUD capability, JWT authentication, live search, and an admin dashboard
for managing users and monitoring activity — all within a single-page application.

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 19 + Vite             |
| Styling    | Tailwind CSS                |
| Charts     | Recharts                    |
| Backend    | Python + FastAPI            |
| ORM        | SQLModel                    |
| Database   | MySQL + PyMySQL             |
| Auth       | JWT (python-jose) + bcrypt  |

---

## Features

- 🔐 **JWT Authentication** — register, login, persistent sessions via localStorage
- 👤 **Role-based access** — admin and regular user roles
- ➕ **Add expenses** with title, amount, category, date, and description
- ✏️ **Edit expenses** via animated modal — no page reload
- 🗑️ **Delete expenses** with confirmation dialog
- 🔍 **Live search** — filters expenses in real-time as you type
- 🔎 **Filter & sort** by category, date range, and amount
- 📊 **Category breakdown** — pie chart + progress bars
- 📈 **Monthly trend** — bar chart of last 6 months
- 💡 **Summary stats** — total spent, count, top category, average
- ⚙️ **Admin panel** — manage users, view activity logs, delete accounts
- 📜 **Activity logging** — every login, register, and CRUD action is recorded
- 📱 **Fully responsive** — works on mobile and desktop
- ⚡ **SPA behaviour** — zero page reloads

---

## Folder Structure
spendwise/
├── backend/
│   ├── main.py           # FastAPI entry point, middleware, routers
│   ├── database.py       # MySQL engine, session, init_db, admin seed
│   ├── models.py         # SQLModel: User, Expense, UserActivity tables
│   ├── schemas.py        # Pydantic request/response schemas
│   ├── auth.py           # JWT creation, password hashing, dependencies
│   ├── auth_routes.py    # Register, login, /me endpoints
│   ├── routes.py         # Expense CRUD + stats (protected)
│   ├── admin_routes.py   # Admin: users, activity logs, summary
│   ├── seed.py           # Sample expense data seeder
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state (user, login, logout)
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Top bar with tab switching + logout
│   │   │   ├── Modal.jsx         # Reusable animated modal
│   │   │   ├── ExpenseForm.jsx   # Add + Edit form with validation
│   │   │   ├── ExpenseCard.jsx   # Single expense row
│   │   │   ├── FilterBar.jsx     # Category + date + sort filters
│   │   │   ├── SearchBar.jsx     # Live search input
│   │   │   ├── DeleteConfirm.jsx # Delete confirmation dialog
│   │   │   ├── Charts.jsx        # Pie + bar charts (Recharts)
│   │   │   └── StatCard.jsx      # Summary stat tile
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx     # Login + register (toggleable)
│   │   │   ├── Dashboard.jsx     # Overview with stats + charts
│   │   │   ├── Logbook.jsx       # Expense list with CRUD + search
│   │   │   └── AdminPanel.jsx    # User management + activity logs
│   │   ├── hooks/
│   │   │   ├── useExpenses.js    # Expense state + CRUD operations
│   │   │   └── useStats.js       # Dashboard stats fetching
│   │   ├── services/
│   │   │   └── api.js            # All Axios API calls
│   │   └── utils/
│   │       └── constants.js      # Categories, colours, formatters
│   └── index.html                # Single HTML entry point (SPA)
├── data/
│   └── spendwise_export.sql      # Full DB export for submission
└── README.md

---

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- MySQL 8+

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create `backend/.env`:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=spendwise
SECRET_KEY=spendwise_super_secret_jwt_key_2025
ALGORITHM=HS256

```bash
mysql -u root -p -e "CREATE DATABASE spendwise;"
uvicorn main:app --reload
```

Server runs at `http://localhost:8000`
Swagger docs at `http://localhost:8000/docs`

Default admin account created automatically:
- Username: `admin`
- Password: `admin123`

Seed sample expenses (optional):
```bash
python seed.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Database Export

Full SQL export available at `data/spendwise_export.sql`.

To import:
```bash
mysql -u root -p spendwise < data/spendwise_export.sql
```

---

## Workload Allocation

This project was completed individually.

| File(s) | Author |
|---|---|
| All backend files | Abhishek |
| All frontend files | Abhishek |

---

## Challenges Overcome

Implementing JWT authentication required careful handling of token persistence — storing in localStorage and attaching to every Axios request via an interceptor. The SQLModel relationship fields on the `Expense` model caused silent 500 errors when FastAPI tried to serialize responses; resolved by introducing a dedicated `expense_to_dict()` helper that returns plain dicts. Bcrypt 5.0.0 is incompatible with passlib 1.7.4 — downgrading to bcrypt 4.0.1 resolved the authentication failure. The `expense` table was created before `user_id` was added to the schema, requiring a manual `ALTER TABLE` on the development machine; fresh installations are unaffected as `create_all` generates the correct schema from the start. Tailwind CSS v4 introduced a breaking PostCSS API change — pinning to v3 resolved the build failure.