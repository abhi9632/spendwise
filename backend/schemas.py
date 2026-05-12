from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from datetime import date as DateType
from typing import Optional


class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool
    created_at: datetime


class TokenOut(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


class ActivityOut(BaseModel):
    id: int
    user_id: int
    action: str
    detail: Optional[str]
    timestamp: datetime

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    date: DateType
    description: Optional[str] = ""