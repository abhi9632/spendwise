import { useState, useEffect } from 'react'
import { getAdminUsers, getAdminActivities, getAdminSummary, deleteUser, getUserActivities } from '../services/api'
import { formatCurrency } from '../utils/constants'
import Modal from '../components/Modal'

function StatTile({ label, value, icon }) {
  return (
    <div className="card flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-muted text-xs uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-display font-bold text-xl text-white">{value}</p>
      </div>
    </div>
  )
}

export default function AdminPanel() {
  const [tab,           setTab]           = useState('users')
  const [users,         setUsers]         = useState([])
  const [activities,    setActivities]    = useState([])
  const [summary,       setSummary]       = useState(null)
  const [loading,       setLoading]       = useState(true)
  const [deleteTarget,  setDeleteTarget]  = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [activityUser,  setActivityUser]  = useState(null)
  const [userActivities,setUserActivities]= useState([])
  const [toast,         setToast]         = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  useEffect(() => {
    Promise.all([getAdminUsers(), getAdminActivities(), getAdminSummary()])
      .then(([u, a, s]) => { setUsers(u); setActivities(a); setSummary(s) })
      .finally(() => setLoading(false))
  }, [])

  const handleDeleteUser = async () => {
    setDeleteLoading(true)
    try {
      await deleteUser(deleteTarget.id)
      setUsers(prev => prev.filter(u => u.id !== deleteTarget.id))
      setDeleteTarget(null)
      showToast(`User ${deleteTarget.username} deleted ✓`)
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete user')
    } finally { setDeleteLoading(false) }
  }

  const handleViewActivity = async (user) => {
    setActivityUser(user)
    const data = await getUserActivities(user.id)
    setUserActivities(data)
  }

  if (loading) return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => <div key={i} className="card h-20" />)}
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <h2 className="font-display font-bold text-2xl">Admin Panel</h2>

      {/* Summary tiles */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatTile label="Total Users"    value={summary.totalUsers}              icon="👥" />
          <StatTile label="Total Expenses" value={summary.totalExpenses}           icon="📋" />
          <StatTile label="Total Spent"    value={formatCurrency(summary.totalSpent)} icon="💰" />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-0">
        {['users', 'activity'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-display font-semibold capitalize border-b-2 transition-all ${
              tab === t
                ? 'border-accent text-white'
                : 'border-transparent text-muted hover:text-white'
            }`}>
            {t === 'users' ? '👥 Users' : '📜 Activity Log'}
          </button>
        ))}
      </div>

      {/* Users tab */}
      {tab === 'users' && (
        <div className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="card flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center font-display font-bold text-accent flex-shrink-0">
                {u.username[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display font-semibold text-white">{u.username}</p>
                  {u.is_admin && (
                    <span className="badge bg-accent/20 text-accent text-xs">Admin</span>
                  )}
                </div>
                <p className="text-muted text-xs font-mono">{u.email}</p>
              </div>
              <p className="text-muted text-xs flex-shrink-0">
                Joined {new Date(u.created_at).toLocaleDateString('en-AU')}
              </p>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleViewActivity(u)}
                  className="w-8 h-8 rounded-lg bg-surface border border-border text-muted hover:text-white flex items-center justify-center transition-all"
                  title="View activity"
                >📜</button>
                {!u.is_admin && (
                  <button
                    onClick={() => setDeleteTarget(u)}
                    className="w-8 h-8 rounded-lg bg-surface border border-border text-muted hover:text-danger hover:border-danger/40 flex items-center justify-center transition-all"
                    title="Delete user"
                  >🗑</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity log tab */}
      {tab === 'activity' && (
        <div className="space-y-2">
          {activities.length === 0 ? (
            <div className="card text-center py-10">
              <p className="text-muted text-sm">No activity logged yet</p>
            </div>
          ) : activities.map(a => (
            <div key={a.id} className="card flex items-center gap-4 py-3">
              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">{a.action}</p>
                <p className="text-xs text-muted truncate">{a.detail}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-muted font-mono">
                  User #{a.user_id}
                </p>
                <p className="text-xs text-muted font-mono">
                  {new Date(a.timestamp).toLocaleString('en-AU')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User activity modal */}
      <Modal
        isOpen={!!activityUser}
        onClose={() => { setActivityUser(null); setUserActivities([]) }}
        title={`Activity — ${activityUser?.username}`}
      >
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {userActivities.length === 0 ? (
            <p className="text-muted text-sm text-center py-6">No activity for this user</p>
          ) : userActivities.map(a => (
            <div key={a.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
              <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{a.action}</p>
                <p className="text-xs text-muted">{a.detail}</p>
              </div>
              <p className="text-xs text-muted font-mono flex-shrink-0">
                {new Date(a.timestamp).toLocaleString('en-AU')}
              </p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Delete user confirm modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete User?"
      >
        <div className="text-center py-2">
          <div className="w-14 h-14 bg-danger/10 border border-danger/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
          <p className="text-muted text-sm mb-1">
            Delete <span className="text-white font-semibold">{deleteTarget?.username}</span>?
          </p>
          <p className="text-muted text-xs mb-6">
            This will permanently delete the user and all their expenses.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="btn-ghost flex-1">Cancel</button>
            <button onClick={handleDeleteUser} disabled={deleteLoading} className="btn-danger flex-1">
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-success text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl animate-scale-in">
          {toast}
        </div>
      )}

    </div>
  )
}