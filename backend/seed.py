from sqlmodel import Session
from database import engine, init_db
from models import Expense
from datetime import date
from models import User
from sqlmodel import select

init_db()

# get admin user id first
with Session(engine) as session:
    admin = session.exec(select(User).where(User.username == "admin")).first()
    admin_id = admin.id if admin else 1

expenses = [
    Expense(title="Woolworths groceries", amount=87.50, category="Food", date=date(2025, 9, 5), description="Weekly grocery run", user_id=admin_id),
    Expense(title="Opal card top-up", amount=50.00, category="Transport", date=date(2025, 9, 8), description="Monthly commute", user_id=admin_id),
    Expense(title="Netflix", amount=22.99, category="Entertainment", date=date(2025, 9, 1), description="Monthly subscription", user_id=admin_id),
    Expense(title="Rent", amount=1400.00, category="Housing", date=date(2025, 9, 1), description="Monthly rent", user_id=admin_id),
    Expense(title="Chemist Warehouse", amount=34.20, category="Health", date=date(2025, 9, 10), description="Vitamins", user_id=admin_id),
    Expense(title="UTS library printing", amount=12.00, category="Education", date=date(2025, 9, 12), description="Assignment printouts", user_id=admin_id),
    Expense(title="Thai restaurant", amount=45.00, category="Food", date=date(2025, 9, 14), description="Dinner with friends", user_id=admin_id),
    Expense(title="Uber to airport", amount=38.00, category="Transport", date=date(2025, 9, 15), description="Sydney Airport", user_id=admin_id),
    Expense(title="ASOS order", amount=119.90, category="Shopping", date=date(2025, 9, 18), description="Winter clothes", user_id=admin_id),
    Expense(title="Spotify Premium", amount=12.99, category="Entertainment", date=date(2025, 10, 1), description="Monthly subscription", user_id=admin_id),
    Expense(title="Electricity bill", amount=180.00, category="Housing", date=date(2025, 10, 5), description="Quarterly bill", user_id=admin_id),
    Expense(title="Coles groceries", amount=95.30, category="Food", date=date(2025, 10, 8), description="Weekly shop", user_id=admin_id),
    Expense(title="GP visit", amount=30.00, category="Health", date=date(2025, 10, 11), description="Bulk billing gap", user_id=admin_id),
    Expense(title="Udemy course", amount=24.99, category="Education", date=date(2025, 10, 15), description="React advanced", user_id=admin_id),
    Expense(title="Rent", amount=1400.00, category="Housing", date=date(2025, 11, 1), description="Monthly rent", user_id=admin_id),
]

with Session(engine) as session:
    for e in expenses:
        session.add(e)
    session.commit()

print(f"✅ Seeded {len(expenses)} expenses")