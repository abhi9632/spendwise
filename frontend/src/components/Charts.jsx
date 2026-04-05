import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { CATEGORY_COLORS, formatCurrency } from '../utils/constants'

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { _id, total, count } = payload[0].payload
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="font-display font-semibold text-white mb-1">{_id}</p>
      <p className="text-muted">{formatCurrency(total)}</p>
      <p className="text-muted text-xs">{count} expense{count !== 1 ? 's' : ''}</p>
    </div>
  )
}

export function CategoryPieChart({ data }) {
  if (!data?.length) return <EmptyChart message="No category data yet" />
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="total" nameKey="_id"
          cx="50%" cy="50%" innerRadius={60} outerRadius={100}
          paddingAngle={3} strokeWidth={0}>
          {data.map(entry => (
            <Cell key={entry._id} fill={CATEGORY_COLORS[entry._id] || '#6b7280'} opacity={0.9} />
          ))}
        </Pie>
        <Tooltip content={<PieTooltip />} />
        <Legend formatter={(v) => <span style={{ color: '#9ca3af', fontSize: 12 }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  )
}

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="font-display font-semibold text-white mb-1">{label}</p>
      <p className="text-accent font-mono">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

export function MonthlyBarChart({ data }) {
  if (!data?.length) return <EmptyChart message="No monthly data yet" />
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a45" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={v => `$${v}`} tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={false} tickLine={false} width={55} />
        <Tooltip content={<BarTooltip />} cursor={{ fill: '#2a2a45' }} />
        <Bar dataKey="total" fill="#6c63ff" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  )
}

function EmptyChart({ message }) {
  return <div className="h-48 flex items-center justify-center text-muted text-sm">{message}</div>
}