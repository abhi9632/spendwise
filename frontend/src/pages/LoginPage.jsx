import { useState } from 'react'
import { login, register } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { loginUser } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [form,        setForm]       = useState({ username: '', email: '', password: '' })
  const [error,       setError]      = useState(null)
  const [loading,     setLoading]    = useState(false)

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = isRegister
        ? await register(form)
        : await login({ username: form.username, password: form.password })
      loginUser(res.access_token, res.user)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">💸</span>
          <h1 className="font-display font-bold text-3xl mt-3">
            Spend<span className="text-accent">Wise</span>
          </h1>
          <p className="text-muted text-sm mt-1">Track your expenses smarter</p>
        </div>

        {/* Card */}
        <div className="card">
          <h2 className="font-display font-bold text-xl mb-6">
            {isRegister ? 'Create account' : 'Welcome back'}
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">

              <div>
                <label className="label">Username</label>
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="your_username"
                  className="input"
                  required
                />
              </div>

              {isRegister && (
                <div>
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input"
                    required
                  />
                </div>
              )}

              <div>
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input"
                  required
                />
              </div>

              {error && (
                <p className="text-danger text-sm bg-danger/10 border border-danger/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
              </button>

            </div>
          </form>

          <p className="text-center text-muted text-sm mt-6">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            {' '}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(null) }}
              className="text-accent hover:underline"
            >
              {isRegister ? 'Sign in' : 'Register'}
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}