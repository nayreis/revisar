import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('revisar_token'))

  useEffect(() => {
    const savedUser = localStorage.getItem('revisar_user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  function login(userData, accessToken) {
    setUser(userData)
    setToken(accessToken)
    localStorage.setItem('revisar_token', accessToken)
    localStorage.setItem('revisar_user', JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('revisar_token')
    localStorage.removeItem('revisar_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}