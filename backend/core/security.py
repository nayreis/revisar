from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client
from core.config import SUPABASE_URL, SUPABASE_SERVICE_KEY

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

bearer_scheme = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    try:
        user = supabase.auth.get_user(token)
        if not user.user:
            raise HTTPException(status_code=401, detail="Token inválido")
        return user.user.id
    except Exception:
        raise HTTPException(status_code=401, detail="Token expirado ou inválido")