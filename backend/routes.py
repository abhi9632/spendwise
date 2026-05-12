from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Expense, UserActivity, User
from schemas import ExpenseCreate
from auth import get_current_user
from datetime import date
from typing import Optional

router = APIRouter(prefix="/api/expenses", tags=["expenses"])


def log_activity(session: Session, user_id: int, action: str, detail: str = ""):
    session.add(UserActivity(user_id=user_id, action=action, detail=detail))
    session.commit()


def expense_to_dict(e: Expense) -> dict:
    return {
        "id":          e.id,
        "title":       e.title,
        "amount":      e.amount,
        "category":    e.category,
        "date":        str(e.date),
        "description": e.description,
        "user_id":     e.user_id,
    }


@router.get("/stats")
def get_stats(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    expenses = session.exec(select(Expense).where(Expense.user_id == current_user.id)).all()

    category_map = {}
    for e in expenses:
        if e.category not in category_map:
            category_map[e.category] = {"_id": e.category, "total": 0, "count": 0}
        category_map[e.category]["total"] += e.amount
        category_map[e.category]["count"] += 1
    by_category = sorted(category_map.values(), key=lambda x: x["total"], reverse=True)

    month_map = {}
    for e in expenses:
        key   = f"{e.date.year}-{e.date.month:02d}"
        label = e.date.strftime("%b %Y")
        if key not in month_map:
            month_map[key] = {"key": key, "label": label, "total": 0, "count": 0}
        month_map[key]["total"] += e.amount
        month_map[key]["count"] += 1
    by_month = sorted(month_map.values(), key=lambda x: x["key"])[-6:]

    return {
        "success": True,
        "data": {
            "byCategory": by_category,
            "byMonth":    by_month,
            "totalSpent": sum(e.amount for e in expenses),
            "totalCount": len(expenses),
        },
    }


@router.get("/")
def get_expenses(
    category:   Optional[str]  = None,
    start_date: Optional[date] = None,
    end_date:   Optional[date] = None,
    sort:       Optional[str]  = "-date",
    search:     Optional[str]  = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    query = select(Expense).where(Expense.user_id == current_user.id)
    if category and category != "All":
        query = query.where(Expense.category == category)
    if start_date:
        query = query.where(Expense.date >= start_date)
    if end_date:
        query = query.where(Expense.date <= end_date)

    expenses = session.exec(query).all()

    if search:
        s = search.lower()
        expenses = [
            e for e in expenses
            if s in e.title.lower()
            or s in (e.description or "").lower()
            or s in e.category.lower()
        ]

    sort = sort or "-date"
    reverse = sort.startswith("-")
    field = sort.lstrip("-")
    if field in ("date", "amount"):
        expenses = sorted(expenses, key=lambda e: getattr(e, field), reverse=reverse)

    return {"success": True, "count": len(expenses), "data": [expense_to_dict(e) for e in expenses]}


@router.get("/{expense_id}")
def get_expense(
    expense_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    expense = session.get(Expense, expense_id)
    if not expense or expense.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"success": True, "data": expense_to_dict(expense)}


@router.post("/", status_code=201)
def create_expense(
    data: ExpenseCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    expense = Expense(**data.model_dump(), user_id=current_user.id)
    session.add(expense)
    session.commit()
    session.refresh(expense)
    log_activity(session, current_user.id, "create_expense", f"Created: {expense.title}")
    return {"success": True, "data": expense_to_dict(expense)}


@router.put("/{expense_id}")
def update_expense(
    expense_id: int,
    data: ExpenseCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    expense = session.get(Expense, expense_id)
    if not expense or expense.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Expense not found")

    for key, value in data.model_dump().items():
        setattr(expense, key, value)

    session.add(expense)
    session.commit()
    session.refresh(expense)
    log_activity(session, current_user.id, "update_expense", f"Updated: {expense.title}")
    return {"success": True, "data": expense_to_dict(expense)}


@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    expense = session.get(Expense, expense_id)
    if not expense or expense.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Expense not found")

    title = expense.title
    session.delete(expense)
    session.commit()
    log_activity(session, current_user.id, "delete_expense", f"Deleted: {title}")
    return {"success": True, "message": "Expense deleted"}