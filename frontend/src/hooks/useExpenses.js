import { useState, useEffect, useCallback } from 'react'
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../services/api'

export function useExpenses(filters = {}) {
  const [expenses, setExpenses] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  const fetchExpenses = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const data = await getExpenses(filters)
      setExpenses(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load expenses')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  const addExpense = useCallback(async (data) => {
    const created = await createExpense(data)
    setExpenses(prev => [created, ...prev])
    return created
  }, [])

  const editExpense = useCallback(async (id, data) => {
    const updated = await updateExpense(id, data)
    setExpenses(prev => prev.map(e => e.id === id ? updated : e))
    return updated
  }, [])

  const removeExpense = useCallback(async (id) => {
    await deleteExpense(id)
    setExpenses(prev => prev.filter(e => e.id !== id))
  }, [])

  return { expenses, loading, error, refetch: fetchExpenses, addExpense, editExpense, removeExpense }
}