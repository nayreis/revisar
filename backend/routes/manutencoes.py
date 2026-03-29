from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from models.schemas import ManutencaoCreate, ManutencaoUpdate, ChecklistItemCreate, ChecklistItemUpdate
from services.manutencao_service import (
    listar_manutencoes, criar_manutencao, buscar_manutencao,
    atualizar_manutencao, deletar_manutencao,
    listar_checklist, criar_item_checklist, atualizar_item_checklist
)
from core.security import get_current_user

router = APIRouter(prefix="/manutencoes", tags=["Manutenções"])

@router.get("/")
async def get_manutencoes(
    tipo: Optional[str] = None,
    status: Optional[str] = None,
    equipamento: Optional[str] = None,
    prioridade: Optional[str] = None,
    user_id: str = Depends(get_current_user)
):
    return listar_manutencoes(tipo, status, equipamento, prioridade)


@router.post("/", status_code=201)
async def post_manutencao(
    body: ManutencaoCreate,
    user_id: str = Depends(get_current_user)
):
    return criar_manutencao(body.model_dump(), user_id)


@router.get("/{manutencao_id}")
async def get_manutencao(
    manutencao_id: str,
    user_id: str = Depends(get_current_user)
):
    item = buscar_manutencao(manutencao_id)
    if not item:
        raise HTTPException(status_code=404, detail="Manutenção não encontrada")
    return item


@router.put("/{manutencao_id}")
async def put_manutencao(
    manutencao_id: str,
    body: ManutencaoUpdate,
    user_id: str = Depends(get_current_user)
):
    return atualizar_manutencao(manutencao_id, body.model_dump())


@router.delete("/{manutencao_id}")
async def delete_manutencao(
    manutencao_id: str,
    user_id: str = Depends(get_current_user)
):
    return deletar_manutencao(manutencao_id)


# --- CHECKLIST ---
@router.get("/{manutencao_id}/checklist")
async def get_checklist(
    manutencao_id: str,
    user_id: str = Depends(get_current_user)
):
    return listar_checklist(manutencao_id)


@router.post("/{manutencao_id}/checklist", status_code=201)
async def post_checklist_item(
    manutencao_id: str,
    body: ChecklistItemCreate,
    user_id: str = Depends(get_current_user)
):
    return criar_item_checklist(body.model_dump())


@router.patch("/checklist/{item_id}")
async def patch_checklist_item(
    item_id: str,
    body: ChecklistItemUpdate,
    user_id: str = Depends(get_current_user)
):
    return atualizar_item_checklist(item_id, body.concluido)