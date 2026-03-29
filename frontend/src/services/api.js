import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Antes de cada requisição, adiciona o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('revisar_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Se receber 401, limpa o token e manda para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('revisar_token')
      localStorage.removeItem('revisar_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api