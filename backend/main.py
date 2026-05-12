from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes import router as expense_router
from auth_routes import router as auth_router
from admin_routes import router as admin_router
import traceback

app = FastAPI(title="SpendWise API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    traceback.print_exc()
    return JSONResponse(status_code=500, content={"detail": str(exc)})

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth_router)
app.include_router(expense_router)
app.include_router(admin_router)

@app.get("/api/health")
def health():
    return {"status": "ok"}