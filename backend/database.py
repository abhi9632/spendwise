from sqlmodel import SQLModel, create_engine, Session, select
from dotenv import load_dotenv
import os

load_dotenv()

DB_URL = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)

engine = create_engine(DB_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    SQLModel.metadata.create_all(engine)
    _seed_admin()

def _seed_admin():
    # Import here to avoid circular imports
    from models import User
    from auth import hash_password
    with Session(engine) as session:
        exists = session.exec(select(User).where(User.username == "admin")).first()
        if not exists:
            admin = User(
                username="admin",
                email="admin@spendwise.com",
                hashed_password=hash_password("admin123"),
                is_admin=True,
            )
            session.add(admin)
            session.commit()
            print("✅ Admin user created: admin / admin123")