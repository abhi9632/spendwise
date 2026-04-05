import { useState } from 'react'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import ExpenseForm from './components/ExpenseForm'
import { createExpense } from './services/api'

export default function App() {
  const [activeView,   setActiveView]   = useState('dashboard')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [formLoading,  setFormLoading]  = useState(false)

  const handleAddClick = () => {
    setActiveView('logbook')
    setAddModalOpen(true)
  }

  const handleAdd = async (data) => {
    setFormLoading(true)
    try {
      await createExpense(data)
      setAddModalOpen(false)
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to add expense')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onAddClick={handleAddClick}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeView === 'dashboard' && (
          <div className="card text-center py-20">
            <p className="font-display font-bold text-2xl mb-2">Dashboard</p>
            <p className="text-muted text-sm">Coming in Commit 7</p>
          </div>
        )}
        {activeView === 'logbook' && (
          <div className="card text-center py-20">
            <p className="font-display font-bold text-2xl mb-2">Logbook</p>
            <p className="text-muted text-sm">Coming in Commit 6</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-6 text-center">
        <p className="text-muted text-xs font-mono">SpendWise · React + FastAPI + MySQL</p>
      </footer>

      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Expense">
        <ExpenseForm
          onSubmit={handleAdd}
          onCancel={() => setAddModalOpen(false)}
          loading={formLoading}
        />
      </Modal>
    </div>
  )
}