from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from routes import auth, manutencoes

security = HTTPBearer()

app = FastAPI(
    title="Revisar API",
    description="Sistema de manutenção do Lab de Usinagem — UNIFEI",
    version="1.0.0",
    swagger_ui_parameters={"persistAuthorization": True},
    components={
        "securitySchemes": {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer"
            }
        }
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://revisar.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(manutencoes.router)

@app.get("/health")
async def health():
    return {"status": "ok", "sistema": "Revisar — Lab Usinagem UNIFEI"}