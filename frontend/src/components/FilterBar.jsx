import { CATEGORIES } from '../utils/constants'

export default function FilterBar({ filters, onChange }) {
  const set = (field) => (e) => onChange({ ...filters, [field]: e.target.value })
  const isFiltered = filters.category !== 'All' || filters.startDate || filters.endDate

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select value={filters.category} onChange={set('category')} className="input w-auto text-sm py-2">
        <option value="All">All Categories</option>
        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <input type="date" value={filters.startDate} onChange={set('startDate')}
        className="input w-auto text-sm py-2" title="From date" />
      <input type="date" value={filters.endDate} onChange={set('endDate')}
        className="input w-auto text-sm py-2" title="To date" />
      <select value={filters.sort} onChange={set('sort')} className="input w-auto text-sm py-2">
        <option value="-date">Newest first</option>
        <option value="date">Oldest first</option>
        <option value="-amount">Highest amount</option>
        <option value="amount">Lowest amount</option>
      </select>
      {isFiltered && (
        <button onClick={() => onChange({ category: 'All', startDate: '', endDate: '', sort: '-date' })}
          className="text-sm text-muted hover:text-white underline underline-offset-2 transition-colors">
          Reset
        </button>
      )}
    </div>
  )
}