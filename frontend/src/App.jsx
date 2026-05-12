import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Logbook from './pages/Logbook'
import LoginPage from './pages/LoginPage'

export default function App() {
  const { user, loading } = useAuth()
  const [activeView,   setActiveView]   = useState('dashboard')
  const [addModalOpen, setAddModalOpen] = useState(false)

  const handleAddClick = () => {
    setActiveView('logbook')
    setAddModalOpen(true)
  }

  if (loading) return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <p className="text-muted font-mono text-sm">Loading...</p>
    </div>
  )

  if (!user) return <LoginPage />

  return (
    <div className="min-h-screen bg-ink">
      <Navbar activeView={activeView} setActiveView={setActiveView} onAddClick={handleAddClick} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeView === 'dashboard' && <Dashboard onAddClick={handleAddClick} />}
        {activeView === 'logbook'   && (
          <Logbook externalModal={addModalOpen} onExternalModalClose={() => setAddModalOpen(false)} />
        )}
        {activeView === 'admin' && user?.is_admin && (
          <div className="card text-center py-20">
            <p className="font-display font-bold text-2xl mb-2">Admin Panel</p>
            <p className="text-muted text-sm">Coming in Commit 7</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-6 text-center">
        <p className="text-muted text-xs font-mono">SpendWise · React + FastAPI + MySQL</p>
      </footer>
    </div>
  )
}