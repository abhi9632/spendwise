from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Expense
from datetime import date
from typing import Optional

router = APIRouter(prefix="/api/expenses", tags=["expenses"])


@router.get("/")
def get_expenses(
    category: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    sort: Optional[str] = "-date",
    session: Session = Depends(get_session),
):
    query = select(Expense)

    if category and category != "All":
        query = query.where(Expense.category == category)
    if start_date:
        query = query.where(Expense.date >= start_date)
    if end_date:
        query = query.where(Expense.date <= end_date)

    expenses = session.exec(query).all()

    # Sorting
    reverse = sort.startswith("-")
    field = sort.lstrip("-")
    if field in ("date", "amount"):
        expenses = sorted(expenses, key=lambda e: getattr(e, field), reverse=reverse)

    return {"success": True, "count": len(expenses), "data": expenses}


@router.get("/stats")
def get_stats(session: Session = Depends(get_session)):
    expenses = session.exec(select(Expense)).all()

    # Category breakdown
    category_map = {}
    for e in expenses:
        if e.category not in category_map:
            category_map[e.category] = {"_id": e.category, "total": 0, "count": 0}
        category_map[e.category]["total"] += e.amount
        category_map[e.category]["count"] += 1
    by_category = sorted(category_map.values(), key=lambda x: x["total"], reverse=True)

    # Monthly trend (last 6 months)
    month_map = {}
    for e in expenses:
        key = f"{e.date.year}-{e.date.month:02d}"
        label = e.date.strftime("%b %Y")
        if key not in month_map:
            month_map[key] = {"key": key, "label": label, "total": 0, "count": 0}
        month_map[key]["total"] += e.amount
        month_map[key]["count"] += 1
    by_month = sorted(month_map.values(), key=lambda x: x["key"])[-6:]

    total_spent = sum(e.amount for e in expenses)
    total_count = len(expenses)

    return {
        "success": True,
        "data": {
            "byCategory": by_category,
            "byMonth": by_month,
            "totalSpent": total_spent,
            "totalCount": total_count,
        },
    }


@router.get("/{expense_id}")
def get_expense(expense_id: int, session: Session = Depends(get_session)):
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"success": True, "data": expense}


@router.post("/", status_code=201)
def create_expense(expense: Expense, session: Session = Depends(get_session)):
    session.add(expense)
    session.commit()
    session.refresh(expense)
    return {"success": True, "data": expense}


@router.put("/{expense_id}")
def update_expense(expense_id: int, updated: Expense, session: Session = Depends(get_session)):
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    data = updated.model_dump(exclude_unset=True, exclude={"id"})
    for key, value in data.items():
        setattr(expense, key, value)

    session.add(expense)
    session.commit()
    session.refresh(expense)
    return {"success": True, "data": expense}


@router.delete("/{expense_id}")
def delete_expense(expense_id: int, session: Session = Depends(get_session)):
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    session.delete(expense)
    session.commit()
    return {"success": True, "message": "Expense deleted"}