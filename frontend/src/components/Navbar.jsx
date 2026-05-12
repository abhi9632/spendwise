import { useAuth } from '../context/AuthContext'

export default function Navbar({ activeView, setActiveView, onAddClick }) {
  const { user, logoutUser } = useAuth()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '◈' },
    { id: 'logbook',   label: 'Logbook',   icon: '≡' },
    ...(user?.is_admin ? [{ id: 'admin', label: 'Admin', icon: '⚙' }] : []),
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-ink/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2.5">
          <span className="text-2xl">💸</span>
          <span className="font-display font-bold text-xl tracking-tight">
            Spend<span className="text-accent">Wise</span>
          </span>
        </div>

        <nav className="flex items-center gap-1 bg-surface border border-border rounded-xl p-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-display font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeView === item.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'text-muted hover:text-white'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-muted text-sm hidden sm:block">
            {user?.username}
          </span>
          <button onClick={onAddClick} className="btn-primary flex items-center gap-2">
            <span className="text-lg leading-none">+</span>
            <span>Add Expense</span>
          </button>
          <button onClick={logoutUser} className="btn-ghost px-3 py-2.5">
            Sign out
          </button>
        </div>

      </div>
    </header>
  )
}