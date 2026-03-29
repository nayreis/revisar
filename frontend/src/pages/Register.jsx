import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Register() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', perfil: 'estagiario' })
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
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setErro('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="logo-gear">⚙</div>
          <span className="logo-name">Revisar</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome completo</label>
            <input className="form-input" name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input className="form-input" name="senha" type="password" placeholder="••••••••" value={form.senha} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Perfil</label>
            <select className="form-input" name="perfil" value={form.perfil} onChange={handleChange}>
              <option value="estagiario">Estagiário</option>
              <option value="tecnico">Técnico</option>
            </select>
          </div>

          {erro && <div className="alert-error">{erro}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="login-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}