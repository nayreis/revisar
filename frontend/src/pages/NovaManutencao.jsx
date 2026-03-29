import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function NovaManutencao() {
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    tipo: 'preventiva',
    equipamento: 'Centro de Usinagem',
    prioridade: 'media',
    prazo: '',
    status: 'pendente'
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const dados = { ...form }
      if (!dados.prazo) delete dados.prazo
      await api.post('/manutencoes/', dados)
      navigate('/')
    } catch (err) {
      setErro('Erro ao criar manutenção. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Navbar />
      <div className="main" style={{ maxWidth: 600, margin: '2rem auto' }}>
        <h1 className="page-title">Nova <span>ordem de serviço</span></h1>

        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Descrição do problema / serviço</label>
            <input className="form-input" name="titulo" placeholder="Ex: Falha no eixo Z..." value={form.titulo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Detalhes (opcional)</label>
            <input className="form-input" name="descricao" placeholder="Informações adicionais..." value={form.descricao} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Equipamento</label>
              <select className="form-input" name="equipamento" value={form.equipamento} onChange={handleChange}>
                <option>Centro de Usinagem</option>
                <option>Fresadora CNC</option>
                <option>Torno CNC</option>
                <option>Serra de Fita</option>
                <option>Retífica</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Tipo</label>
              <select className="form-input" name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="preventiva">Preventiva</option>
                <option value="corretiva">Corretiva</option>
                <option value="inspecao">Inspeção</option>
                <option value="troca">Troca de peças</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Prioridade</label>
              <select className="form-input" name="prioridade" value={form.prioridade} onChange={handleChange}>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Prazo</label>
              <input className="form-input" name="prazo" type="date" value={form.prazo} onChange={handleChange} />
            </div>
          </div>

          {erro && <div className="alert-error">{erro}</div>}

          <div className="form-row" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Criando...' : 'Abrir OS'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}