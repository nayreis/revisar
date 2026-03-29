from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

# --- AUTENTICAÇÃO ---
class RegisterRequest(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    perfil: str = "estagiario"  # "tecnico" ou "estagiario"

class LoginRequest(BaseModel):
    email: EmailStr
    senha: str

# --- MANUTENÇÕES ---
class ManutencaoCreate(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    tipo: str = "preventiva"
    # preventiva | corretiva | inspecao | troca
    equipamento: str
    # Centro de Usinagem | Fresadora CNC | Torno CNC | Serra de Fita | Retífica
    responsavel_id: Optional[str] = None
    prioridade: str = "media"   # baixa | media | alta | critica
    prazo: Optional[date] = None
    status: str = "pendente"    # pendente | em_execucao | concluida

class ManutencaoUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    tipo: Optional[str] = None
    equipamento: Optional[str] = None
    responsavel_id: Optional[str] = None
    prioridade: Optional[str] = None
    prazo: Optional[date] = None
    status: Optional[str] = None

# --- CHECKLIST ---
class ChecklistItemCreate(BaseModel):
    manutencao_id: str
    descricao: str

class ChecklistItemUpdate(BaseModel):
    concluido: bool