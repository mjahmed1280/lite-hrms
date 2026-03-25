import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  config.headers["x-admin-password"] = import.meta.env.VITE_ADMIN_PASSWORD
  return config
})
