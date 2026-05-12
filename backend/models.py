from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date, datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(max_length=50, unique=True, index=True)
    email: str = Field(max_length=100, unique=True, index=True)
    hashed_password: str
    is_admin: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    expenses: List["Expense"] = Relationship(back_populates="owner")
    activities: List["UserActivity"] = Relationship(back_populates="user")


class Expense(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=100)
    amount: float
    category: str
    date: date
    description: Optional[str] = Field(default="", max_length=500)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

    owner: Optional[User] = Relationship(back_populates="expenses")


class UserActivity(SQLModel, table=True):
    __tablename__ = "useractivity"
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    action: str = Field(max_length=100)
    detail: Optional[str] = Field(default="", max_length=255)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="activities")