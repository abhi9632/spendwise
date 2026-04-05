import { useState, useEffect } from 'react'
import { getStats } from '../services/api'

export function useStats() {
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchStats = async () => {
    setLoading(true); setError(null)
    try {
      setStats(await getStats())
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats() }, [])
  return { stats, loading, error, refetch: fetchStats }
}