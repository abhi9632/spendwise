import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Logbook from './pages/Logbook'

export default function App() {
  const [activeView,   setActiveView]   = useState('dashboard')
  const [addModalOpen, setAddModalOpen] = useState(false)

  const handleAddClick = () => {
    setActiveView('logbook')
    setAddModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-ink">
      <Navbar activeView={activeView} setActiveView={setActiveView} onAddClick={handleAddClick} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeView === 'dashboard' && <Dashboard onAddClick={handleAddClick} />}
        {activeView === 'logbook'   && (
          <Logbook externalModal={addModalOpen} onExternalModalClose={() => setAddModalOpen(false)} />
        )}
      </main>

      <footer className="border-t border-border mt-16 py-6 text-center">
        <p className="text-muted text-xs font-mono">SpendWise · React + FastAPI + MySQL</p>
      </footer>
    </div>
  )
}