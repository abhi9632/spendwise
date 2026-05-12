import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Attach JWT token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const register = (data) =>
  api.post('/auth/register', data).then(r => r.data)

export const login = (data) =>
  api.post('/auth/login', data).then(r => r.data)

export const getMe = () =>
  api.get('/auth/me').then(r => r.data)

export const getExpenses = (params = {}) =>
  api.get('/expenses/', { params }).then(r => r.data.data)

export const getStats = () =>
  api.get('/expenses/stats').then(r => r.data.data)

export const createExpense = (data) =>
  api.post('/expenses/', data).then(r => r.data.data)

export const updateExpense = (id, data) =>
  api.put(`/expenses/${id}`, data).then(r => r.data.data)

export const deleteExpense = (id) =>
  api.delete(`/expenses/${id}`).then(r => r.data)

export const getAdminSummary = () =>
  api.get('/admin/summary').then(r => r.data.data)

export const getAdminUsers = () =>
  api.get('/admin/users').then(r => r.data.data)

export const getAdminActivities = () =>
  api.get('/admin/activities').then(r => r.data.data)

export const getUserActivities = (userId) =>
  api.get(`/admin/activities/${userId}`).then(r => r.data.data)

export const deleteUser = (userId) =>
  api.delete(`/admin/users/${userId}`).then(r => r.data)

export default api