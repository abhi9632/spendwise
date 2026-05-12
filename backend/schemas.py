from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime
from datetime import date as DateType, date
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

    @field_validator('title')
    def title_valid(cls, v):
        if not v.strip():
            raise ValueError('Title is required')
        if len(v.strip()) < 2:
            raise ValueError('Title must be at least 2 characters')
        if len(v) > 100:
            raise ValueError('Title cannot exceed 100 characters')
        return v.strip()

    @field_validator('amount')
    def amount_valid(cls, v):
        if v <= 0:
            raise ValueError('Amount must be greater than 0')
        if v > 100000:
            raise ValueError('Amount cannot exceed 100,000')
        return round(v, 2)

    @field_validator('category')
    def category_valid(cls, v):
        allowed = ['Food','Transport','Housing','Entertainment','Health','Shopping','Education','Other']
        if v not in allowed:
            raise ValueError(f'Invalid category')
        return v

    @field_validator('date')
    def date_not_future(cls, v):
        if v > date.today():
            raise ValueError('Date cannot be in the future')
        return v

    @field_validator('description')
    def description_valid(cls, v):
        if v and len(v) > 500:
            raise ValueError('Description cannot exceed 500 characters')
        return v or ""