import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const res = await api.post('/auth/login', { email, senha })
      login(res.data.usuario, res.data.access_token)
      navigate('/')
    } catch (err) {
      setErro('Email ou senha incorretos')
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
        <p className="login-tagline">
          Sistema de manutenção do<br />
          <strong>Lab de Usinagem — UNIFEI</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <div className="alert-error">{erro}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-footer">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}