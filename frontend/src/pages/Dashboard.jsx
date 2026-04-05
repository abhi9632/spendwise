import { useStats } from '../hooks/useStats'
import StatCard from '../components/StatCard'
import { CategoryPieChart, MonthlyBarChart } from '../components/Charts'
import { formatCurrency, CATEGORY_COLORS, CATEGORY_ICONS } from '../utils/constants'

export default function Dashboard({ onAddClick }) {
  const { stats, loading, error } = useStats()

  if (loading) return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="card h-24" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card h-72" /><div className="card h-72" />
      </div>
    </div>
  )

  if (error) return (
    <div className="card text-center py-12">
      <p className="text-danger font-display font-semibold">⚠️ {error}</p>
    </div>
  )

  const { byCategory = [], byMonth = [], totalSpent = 0, totalCount = 0 } = stats || {}
  const topCategory = byCategory[0]
  const avgExpense  = totalCount > 0 ? totalSpent / totalCount : 0

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Summary tiles */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Spent" value={formatCurrency(totalSpent)} sub="All time" icon="💰" accent="#6c63ff" />
          <StatCard label="Expenses Logged" value={totalCount} sub="All time" icon="📋" />
          <StatCard
            label="Top Category"
            value={topCategory ? topCategory._id : '—'}
            sub={topCategory ? formatCurrency(topCategory.total) : 'No data'}
            icon={topCategory ? CATEGORY_ICONS[topCategory._id] || '📦' : '📦'}
            accent={topCategory ? CATEGORY_COLORS[topCategory._id] : undefined}
          />
          <StatCard label="Avg per Expense" value={formatCurrency(avgExpense)} sub="All time" icon="📊" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-display font-semibold text-lg mb-4">Spending by Category</h3>
          <CategoryPieChart data={byCategory} />
        </div>
        <div className="card">
          <h3 className="font-display font-semibold text-lg mb-4">Monthly Trend</h3>
          <MonthlyBarChart data={byMonth} />
        </div>
      </div>

      {/* Category breakdown bars */}
      {byCategory.length > 0 && (
        <div className="card">
          <h3 className="font-display font-semibold text-lg mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {byCategory.map(cat => {
              const pct   = totalSpent > 0 ? (cat.total / totalSpent) * 100 : 0
              const color = CATEGORY_COLORS[cat._id] || '#6b7280'
              return (
                <div key={cat._id} className="flex items-center gap-4">
                  <span className="text-lg w-6 flex-shrink-0">{CATEGORY_ICONS[cat._id] || '📦'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">{cat._id}</span>
                      <span className="text-sm font-mono text-muted ml-2 flex-shrink-0">{formatCurrency(cat.total)}</span>
                    </div>
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted w-10 text-right flex-shrink-0">
                    {pct.toFixed(0)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {totalCount === 0 && (
        <div className="card text-center py-16">
          <div className="text-5xl mb-4">💸</div>
          <h3 className="font-display font-bold text-xl mb-2">No expenses yet</h3>
          <p className="text-muted text-sm mb-6">Add your first expense to start tracking your spending.</p>
          <button onClick={onAddClick} className="btn-primary mx-auto">Add your first expense</button>
        </div>
      )}

    </div>
  )
}