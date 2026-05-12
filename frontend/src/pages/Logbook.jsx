import { useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import ExpenseCard from '../components/ExpenseCard'
import FilterBar from '../components/FilterBar'
import SearchBar from '../components/SearchBar'
import Modal from '../components/Modal'
import ExpenseForm from '../components/ExpenseForm'
import DeleteConfirm from '../components/DeleteConfirm'
import { formatCurrency } from '../utils/constants'

const defaultFilters = { category: 'All', startDate: '', endDate: '', sort: '-date' }

export default function Logbook({ externalModal, onExternalModalClose }) {
  const [filters,       setFilters]       = useState(defaultFilters)
  const [search,        setSearch]        = useState('')
  const [editTarget,    setEditTarget]    = useState(null)
  const [deleteTarget,  setDeleteTarget]  = useState(null)
  const [formLoading,   setFormLoading]   = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [toast,         setToast]         = useState(null)

  const params = {}
  if (filters.category !== 'All') params.category   = filters.category
  if (filters.startDate)          params.start_date  = filters.startDate
  if (filters.endDate)            params.end_date    = filters.endDate
  if (filters.sort)               params.sort        = filters.sort
  if (search)                     params.search      = search

  const { expenses, loading, error, addExpense, editExpense, removeExpense } = useExpenses(params)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const handleAdd = async (data) => {
    setFormLoading(true)
    try {
      await addExpense(data)
      onExternalModalClose()
      showToast('Expense added ✓')
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to add expense')
    } finally { setFormLoading(false) }
  }

  const handleEdit = async (data) => {
    setFormLoading(true)
    try {
      await editExpense(editTarget.id, data)
      setEditTarget(null)
      showToast('Expense updated ✓')
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to update expense')
    } finally { setFormLoading(false) }
  }

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await removeExpense(deleteTarget.id)
      setDeleteTarget(null)
      showToast('Expense deleted ✓')
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete expense')
    } finally { setDeleteLoading(false) }
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl">Logbook</h2>
          {!loading && (
            <p className="text-muted text-sm mt-0.5">
              {expenses.length} expense{expenses.length !== 1 ? 's' : ''}
              {expenses.length > 0 && (
                <> · <span className="text-white font-mono">{formatCurrency(total)}</span> total</>
              )}
            </p>
          )}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar filters={filters} onChange={setFilters} />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="card h-20 animate-pulse" />)}
        </div>
      ) : error ? (
        <div className="card text-center py-10">
          <p className="text-danger font-display font-semibold">⚠️ {error}</p>
          <p className="text-muted text-sm mt-1">Check your server connection</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-4xl mb-3">{search ? '🔍' : '📭'}</div>
          <p className="font-display font-semibold text-lg mb-1">
            {search ? `No results for "${search}"` : 'No expenses found'}
          </p>
          <p className="text-muted text-sm">
            {search
              ? 'Try a different search term.'
              : filters.category !== 'All' || filters.startDate || filters.endDate
              ? 'Try adjusting your filters.'
              : 'Add your first expense using the button above.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={externalModal} onClose={onExternalModalClose} title="Add Expense">
        <ExpenseForm onSubmit={handleAdd} onCancel={onExternalModalClose} loading={formLoading} />
      </Modal>

      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Expense">
        <ExpenseForm initial={editTarget} onSubmit={handleEdit}
          onCancel={() => setEditTarget(null)} loading={formLoading} />
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Delete">
        <DeleteConfirm expense={deleteTarget} onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)} loading={deleteLoading} />
      </Modal>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-success text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl animate-scale-in">
          {toast}
        </div>
      )}

    </div>
  )
}