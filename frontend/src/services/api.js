import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

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