from fastapi import APIRouter, HTTPException
from models.schemas import RegisterRequest, LoginRequest
from core.security import supabase

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/register")
async def register(body: RegisterRequest):
    try:
        # Cria o usuário no Supabase Auth — senha já vira bcrypt automaticamente
        response = supabase.auth.sign_up({
            "email": body.email,
            "password": body.senha,
            "options": {
                "data": {
                    "nome": body.nome,
                    "perfil": body.perfil  # tecnico ou estagiario
                }
            }
        })

        if response.user is None:
            raise HTTPException(status_code=400, detail="Erro ao criar usuário")

        return {
            "mensagem": "Usuário criado com sucesso",
            "user_id": response.user.id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(body: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": body.email,
            "password": body.senha
        })

        if response.user is None:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")

        return {
            "access_token": response.session.access_token,
            "token_type": "Bearer",
            "usuario": {
                "id": response.user.id,
                "email": response.user.email,
                "nome": response.user.user_metadata.get("nome"),
                "perfil": response.user.user_metadata.get("perfil")
            }
        }
    except Exception:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")