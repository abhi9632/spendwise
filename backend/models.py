from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

class Expense(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=100)
    amount: float
    category: str
    date: date
    description: Optional[str] = Field(default="", max_length=500)