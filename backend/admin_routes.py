from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import User, UserActivity, Expense
from auth import get_admin_user

router = APIRouter(prefix="/api/admin", tags=["admin"])


def user_to_dict(u: User) -> dict:
    return {
        "id":         u.id,
        "username":   u.username,
        "email":      u.email,
        "is_admin":   u.is_admin,
        "created_at": str(u.created_at),
    }


def activity_to_dict(a: UserActivity) -> dict:
    return {
        "id":        a.id,
        "user_id":   a.user_id,
        "action":    a.action,
        "detail":    a.detail,
        "timestamp": str(a.timestamp),
    }


# ── GET all users ─────────────────────────────────────────────
@router.get("/users")
def get_all_users(
    session: Session = Depends(get_session),
    admin: User = Depends(get_admin_user),
):
    users = session.exec(select(User)).all()
    return {"success": True, "data": [user_to_dict(u) for u in users]}


# ── GET single user ───────────────────────────────────────────
@router.get("/users/{user_id}")
def get_user(
    user_id: int,
    session: Session = Depends(get_session),
    admin: User = Depends(get_admin_user),
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"success": True, "data": user_to_dict(user)}


# ── DELETE user ───────────────────────────────────────────────
@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    session: Session = Depends(get_session),
    admin: User = Depends(get_admin_user),
):
    if user_id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account")
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Delete related records first
    activities = session.exec(select(UserActivity).where(UserActivity.user_id == user_id)).all()
    for a in activities:
        session.delete(a)

    expenses = session.exec(select(Expense).where(Expense.user_id == user_id)).all()
    for e in expenses:
        session.delete(e)

    session.delete(user)
    session.commit()
    return {"success": True, "message": f"User {user.username} deleted"}


# ── GET all activity logs ─────────────────────────────────────
@router.get("/activities")
def get_all_activities(
    session: Session = Depends(get_session),
    admin: User = Depends(get_admin_user),
):
    activities = session.exec(
        select(UserActivity).order_by(UserActivity.timestamp.desc())
    ).all()
    return {"success": True, "data": [activity_to_dict(a) for a in activities]}


# ── GET activity logs for specific user ───────────────────────
@router.get("/activities/{user_id}")
def get_user_activities(
    user_id: int,
    session: Session = Depends(get_session),
    admin: User = Depends(get_admin_user),
):
    activities = session.exec(
        select(UserActivity)
        .where(UserActivity.user_id == user_id)
        .order_by(UserActivity.timestamp.desc())
    ).all()
    return {"success": True, "data": [activity_to_dict(a) for a in activities]}


# ── GET dashboard summary ─────────────────────────────────────
@router.get("/summary")
def get_summary(
    session: Session = Depends(get_session),
    admin: User = Depends(get_admin_user),
):
    total_users    = len(session.exec(select(User)).all())
    total_expenses = len(session.exec(select(Expense)).all())
    total_spent    = sum(e.amount for e in session.exec(select(Expense)).all())
    recent_activities = session.exec(
        select(UserActivity).order_by(UserActivity.timestamp.desc()).limit(10)
    ).all()

    return {
        "success": True,
        "data": {
            "totalUsers":        total_users,
            "totalExpenses":     total_expenses,
            "totalSpent":        total_spent,
            "recentActivities":  [activity_to_dict(a) for a in recent_activities],
        },
    }