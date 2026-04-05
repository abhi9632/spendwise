export default function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className="card flex items-center gap-4"
      style={accent ? { borderColor: `${accent}30` } : {}}>
      {icon && (
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: accent ? `${accent}15` : '#2a2a45' }}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-muted text-xs uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-display font-bold text-xl text-white truncate">{value}</p>
        {sub && <p className="text-muted text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}