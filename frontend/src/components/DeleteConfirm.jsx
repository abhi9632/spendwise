import { formatCurrency } from '../utils/constants'

export default function DeleteConfirm({ expense, onConfirm, onCancel, loading }) {
  if (!expense) return null
  return (
    <div className="text-center py-2">
      <div className="w-14 h-14 bg-danger/10 border border-danger/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
      <h3 className="font-display font-bold text-lg mb-1">Delete Expense?</h3>
      <p className="text-muted text-sm mb-1"><span className="text-white font-medium">{expense.title}</span></p>
      <p className="text-muted text-sm mb-6">{formatCurrency(expense.amount)} · {expense.category}</p>
      <p className="text-muted text-xs mb-6">This action cannot be undone.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="btn-ghost flex-1">Cancel</button>
        <button onClick={onConfirm} disabled={loading} className="btn-danger flex-1">
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}