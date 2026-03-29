import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('revisar_theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    // Adiciona ou remove a classe 'dark' no body
    document.body.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('revisar_theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}