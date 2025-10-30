from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload_route import router as upload_router
from routes.ask_route import router as ask_router

app = FastAPI(title="DocuRAG - Modular Backend")

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(upload_router, prefix="/api")
app.include_router(ask_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Welcome to DocuRAG! Upload a file and start asking questions."}
