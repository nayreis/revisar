import { useAuth } from '../context/AuthContext'
import { useTheme } from '../hooks/useTheme'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-gear">⚙</div>
        <div>
          <span className="logo-name">Revisar</span>
          <div className="logo-sub">LAB USINAGEM · UNIFEI</div>
        </div>
      </div>

      <div className="navbar-right">
        <button className="theme-btn" onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <span className="nav-badge">{user?.perfil?.toUpperCase() || 'USUÁRIO'}</span>
        <span className="nav-greeting">{user?.nome}</span>
        <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  )
}