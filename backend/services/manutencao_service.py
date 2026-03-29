from core.security import supabase

def listar_manutencoes(tipo=None, status=None, equipamento=None, prioridade=None):
    query = supabase.table("manutencoes").select("*")

    if tipo:
        query = query.eq("tipo", tipo)
    if status:
        query = query.eq("status", status)
    if equipamento:
        query = query.eq("equipamento", equipamento)
    if prioridade:
        query = query.eq("prioridade", prioridade)

    # Críticas primeiro, depois por prazo
    query = query.order("prioridade", desc=True).order("prazo")

    return query.execute().data


def criar_manutencao(dados: dict, user_id: str):
    dados["criado_por"] = user_id
    # Converte date para string para o JSON conseguir serializar
    if dados.get("prazo"):
        dados["prazo"] = str(dados["prazo"])
    return supabase.table("manutencoes").insert(dados).execute().data[0]


def buscar_manutencao(manutencao_id: str):
    return supabase.table("manutencoes") \
        .select("*, checklist_items(*)") \
        .eq("id", manutencao_id) \
        .single() \
        .execute().data


def atualizar_manutencao(manutencao_id: str, dados: dict):
    dados_limpos = {k: v for k, v in dados.items() if v is not None}
    return supabase.table("manutencoes") \
        .update(dados_limpos) \
        .eq("id", manutencao_id) \
        .execute().data[0]


def deletar_manutencao(manutencao_id: str):
    supabase.table("manutencoes") \
        .delete() \
        .eq("id", manutencao_id) \
        .execute()
    return {"mensagem": "Manutenção removida"}


def listar_checklist(manutencao_id: str):
    return supabase.table("checklist_items") \
        .select("*") \
        .eq("manutencao_id", manutencao_id) \
        .execute().data


def criar_item_checklist(dados: dict):
    return supabase.table("checklist_items").insert(dados).execute().data[0]


def atualizar_item_checklist(item_id: str, concluido: bool):
    return supabase.table("checklist_items") \
        .update({"concluido": concluido}) \
        .eq("id", item_id) \
        .execute().data[0]