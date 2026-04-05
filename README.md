# SpendWise 💸

> A single-page expense tracking application built with React, FastAPI, and MySQL.

---

## Problem Statement

Managing personal finances is difficult without visibility into spending patterns.
SpendWise gives users a real-time, categorised view of where their money goes —
with full CRUD capability, filtering, and analytics — all within a single-page application.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19 + Vite                   |
| Styling    | Tailwind CSS                      |
| Charts     | Recharts                          |
| Backend    | Python + FastAPI                  |
| ORM        | SQLModel                          |
| Database   | MySQL + PyMySQL                   |

---

## Features

## Features

- Responsive mobile design
- Dynamic category filtering
- Date range filtering
- Dark mode UI
- Animated modal forms
- Real-time expense totals
- Category pie chart
- Monthly trend bar chart
- Full CRUD operations
- Toast notifications
- Input validation
- Auto-seeded sample data

---

## Folder Structure
spendwise/
├── backend/
│   ├── main.py          # FastAPI app entry point
│   ├── database.py      # MySQL engine + session + init_db
│   ├── models.py        # SQLModel Expense table definition
│   ├── routes.py        # All CRUD + stats API routes
│   ├── seed.py          # Sample data seeder
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Modal, ExpenseForm, ExpenseCard, Charts, etc.
│   │   ├── hooks/       # useExpenses, useStats
│   │   ├── pages/       # Dashboard, Logbook
│   │   ├── services/    # Axios API layer
│   │   └── utils/       # Constants, formatters
│   └── index.html       # Single HTML entry point (SPA)
├── data/
│   └── spendwise_export.sql  # Full DB export for submission
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
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=spendwise
```

```bash
# Create the database first
mysql -u root -p -e "CREATE DATABASE spendwise;"

# Start the server (auto-creates table on startup)
uvicorn main:app --reload

# Optional: seed sample data
python seed.py
```

API runs at `http://localhost:8000`  
Swagger docs at `http://localhost:8000/docs`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Database Export

A full SQL export (schema + data) is available at `data/spendwise_export.sql`.

To import:
```bash
mysql -u root -p spendwise < data/spendwise_export.sql
```

---

## Challenges Overcome

Getting true SPA behaviour required managing all view transitions through React state rather than URL routing, ensuring no HTML page reloads occur at any point. The FastAPI aggregation logic for monthly trends required careful date grouping and sorting entirely in Python since SQLModel does not expose MySQL's `DATE_FORMAT` directly. Wiring the "Add Expense" button in the Navbar to open a modal inside the Logbook page — across component boundaries — required lifting modal state up to `App.jsx` and passing it down as props. Tailwind CSS v3 had to be explicitly pinned as v4 introduced a breaking PostCSS API change that is incompatible with the current Vite setup.