# ⚙ Revisar

Sistema de gestão de manutenção para o Laboratório de Usinagem.

## Funcionalidades

- ✅ Autenticação com JWT (login e registro)
- ✅ Cadastro de ordens de serviço (OS)
- ✅ Tipos: preventiva, corretiva, inspeção, troca de peças
- ✅ Filtros por tipo, status e equipamento
- ✅ Checklist de inspeção por OS
- ✅ Dashboard com indicadores em tempo real
- ✅ Tema claro e escuro
- ✅ Interface responsiva (mobile e desktop)

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + Vite |
| Backend | Python + FastAPI |
| Banco de dados | Supabase (PostgreSQL) |
| Autenticação | JWT via Supabase Auth |
| Deploy Frontend | Vercel |
| Deploy Backend | Render |

## Como rodar localmente

### Backend
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Crie um arquivo `backend/.env` com:
```
SUPABASE_URL=sua_url
SUPABASE_SERVICE_KEY=sua_chave
JWT_SECRET=sua_chave_secreta
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Crie um arquivo `frontend/.env` com:
```
VITE_API_URL=http://localhost:8000
```

## Equipamentos gerenciados

- Centro de Usinagem
- Fresadora CNC
- Torno CNC
- Serra de Fita
- Retífica

## Autora

Desenvolvido por **Nayara Reis** — Projeto Desenvolve 2026