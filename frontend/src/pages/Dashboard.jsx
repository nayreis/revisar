import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

const EQUIPAMENTOS = ['Centro de Usinagem', 'Fresadora CNC', 'Torno CNC', 'Serra de Fita', 'Retífica']
const TIPOS = ['preventiva', 'corretiva', 'inspecao', 'troca']

export default function Dashboard() {
  const [manutencoes, setManutencoes] = useState([])
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    carregarManutencoes()
  }, [filtroTipo, filtroStatus])

  async function carregarManutencoes() {
    setLoading(true)
    try {
      const params = {}
      if (filtroTipo) params.tipo = filtroTipo
      if (filtroStatus) params.status = filtroStatus
      const res = await api.get('/manutencoes/', { params })
      setManutencoes(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function concluir(id) {
    try {
      await api.put(`/manutencoes/${id}`, { status: 'concluida' })
      carregarManutencoes()
    } catch (err) {
      console.error(err)
    }
  }

  async function deletar(id) {
    if (!confirm('Remover esta manutenção?')) return
    try {
      await api.delete(`/manutencoes/${id}`)
      carregarManutencoes()
    } catch (err) {
      console.error(err)
    }
  }

  const criticas = manutencoes.filter(m => m.prioridade === 'critica' || m.prioridade === 'alta')
  const concluidas = manutencoes.filter(m => m.status === 'concluida')
  const emExecucao = manutencoes.filter(m => m.status === 'em_execucao')

  return (
    <div className="app">
      <Navbar />
      <div className="layout">
        <aside className="sidebar">
          <div className="sb-item active">▦ Dashboard</div>

          <div className="sb-section">Tipo</div>
          <div className={`sb-item ${filtroTipo === '' ? 'active' : ''}`} onClick={() => setFiltroTipo('')}>Todos</div>
          <div className={`sb-item ${filtroTipo === 'preventiva' ? 'active' : ''}`} onClick={() => setFiltroTipo('preventiva')}>▸ Preventiva</div>
          <div className={`sb-item ${filtroTipo === 'corretiva' ? 'active' : ''}`} onClick={() => setFiltroTipo('corretiva')}>⚡ Corretiva</div>
          <div className={`sb-item ${filtroTipo === 'inspecao' ? 'active' : ''}`} onClick={() => setFiltroTipo('inspecao')}>✓ Inspeção</div>
          <div className={`sb-item ${filtroTipo === 'troca' ? 'active' : ''}`} onClick={() => setFiltroTipo('troca')}>↺ Troca de peças</div>

          <div className="sb-section">Status</div>
          <div className={`sb-item ${filtroStatus === '' ? 'active' : ''}`} onClick={() => setFiltroStatus('')}>Todos</div>
          <div className={`sb-item ${filtroStatus === 'pendente' ? 'active' : ''}`} onClick={() => setFiltroStatus('pendente')}>○ Pendentes</div>
          <div className={`sb-item ${filtroStatus === 'em_execucao' ? 'active' : ''}`} onClick={() => setFiltroStatus('em_execucao')}>◑ Em execução</div>
          <div className={`sb-item ${filtroStatus === 'concluida' ? 'active' : ''}`} onClick={() => setFiltroStatus('concluida')}>● Concluídas</div>
        </aside>

        <main className="main">
          <div className="page-header">
            <div>
              <h1 className="page-title">Manutenções <span>do lab</span></h1>
              <p className="page-sub">{manutencoes.length} registros encontrados</p>
            </div>
            <button className="btn-new" onClick={() => navigate('/nova')}>+ Nova OS</button>
          </div>

          <div className="stats">
            <div className="stat red">
              <div className="stat-label">Críticas</div>
              <div className="stat-num">{criticas.length}</div>
            </div>
            <div className="stat amber">
              <div className="stat-label">Em execução</div>
              <div className="stat-num">{emExecucao.length}</div>
            </div>
            <div className="stat green">
              <div className="stat-label">Concluídas</div>
              <div className="stat-num">{concluidas.length}</div>
            </div>
            <div className="stat blue">
              <div className="stat-label">Total</div>
              <div className="stat-num">{manutencoes.length}</div>
            </div>
          </div>

          {loading ? (
            <div className="loading">Carregando...</div>
          ) : (
            <div className="tasks">
              {manutencoes.length === 0 && (
                <div className="empty">Nenhuma manutenção encontrada.</div>
              )}
              {manutencoes.map(m => (
                <div key={m.id} className={`task ${m.tipo}`}>
                  <div className="task-info">
                    <div className="task-title">{m.titulo}</div>
                    <div className="task-meta">
                      <span className={`tag ${m.tipo}`}>{m.tipo}</span>
                      <span className="tag-equip">⚙ {m.equipamento}</span>
                      {m.prazo && <span className="tag-date">📅 {m.prazo}</span>}
                      <span className={`tag-status ${m.status}`}>{m.status}</span>
                    </div>
                  </div>
                  <div className={`prio ${m.prioridade}`}></div>
                  <div className="task-actions">
                    {m.status !== 'concluida' && (
                      <button className="act-btn" onClick={() => concluir(m.id)} title="Concluir">✓</button>
                    )}
                    <button className="act-btn del" onClick={() => deletar(m.id)} title="Remover">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}