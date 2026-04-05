import { CATEGORY_COLORS, CATEGORY_ICONS, formatCurrency, formatDate } from '../utils/constants'

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  const color = CATEGORY_COLORS[expense.category] || '#6b7280'
  const icon  = CATEGORY_ICONS[expense.category]  || '📦'

  return (
    <div className="expense-item card flex items-center gap-4 hover:border-accent/40 transition-all duration-200 group">

      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}>
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-display font-semibold text-white truncate">{expense.title}</p>
          <span className="badge flex-shrink-0 text-xs"
            style={{ backgroundColor: `${color}20`, color }}>
            {expense.category}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="font-mono">{formatDate(expense.date)}</span>
          {expense.description && <><span>·</span><span className="truncate">{expense.description}</span></>}
        </div>
      </div>

      <p className="flex-shrink-0 font-mono font-semibold text-white">{formatCurrency(expense.amount)}</p>

      <div className="flex-shrink-0 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={() => onEdit(expense)}
          className="w-8 h-8 rounded-lg bg-surface border border-border text-muted hover:text-white hover:border-accent/40 flex items-center justify-center transition-all"
          title="Edit">✏</button>
        <button onClick={() => onDelete(expense)}
          className="w-8 h-8 rounded-lg bg-surface border border-border text-muted hover:text-danger hover:border-danger/40 flex items-center justify-center transition-all"
          title="Delete">🗑</button>
      </div>

    </div>
  )
}