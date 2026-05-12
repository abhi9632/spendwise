import { useState, useEffect } from 'react'
import { CATEGORIES } from '../utils/constants'

const empty = {
  title: '', amount: '', category: 'Food',
  date: new Date().toISOString().split('T')[0], description: '',
}

export default function ExpenseForm({ initial = null, onSubmit, onCancel, loading }) {
  const [form,   setForm]   = useState(empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        title:       initial.title        || '',
        amount:      initial.amount?.toString() || '',
        category:    initial.category     || 'Food',
        date:        initial.date?.split('T')[0] || empty.date,
        description: initial.description  || '',
      })
    } else {
      setForm(empty)
    }
    setErrors({})
  }, [initial])

  const validate = () => {
  const e = {}
  if (!form.title.trim())
    e.title = 'Title is required'
  else if (form.title.trim().length < 2)
    e.title = 'Title must be at least 2 characters'

  if (!form.amount)
    e.amount = 'Amount is required'
  else if (isNaN(Number(form.amount)))
    e.amount = 'Amount must be a number'
  else if (Number(form.amount) <= 0)
    e.amount = 'Amount must be greater than 0'
  else if (Number(form.amount) > 100000)
    e.amount = 'Amount cannot exceed $100,000'

  if (!form.date)
    e.date = 'Date is required'
  else if (new Date(form.date) > new Date())
    e.date = 'Date cannot be in the future'

  if (form.description && form.description.length > 500)
    e.description = 'Description cannot exceed 500 characters'

  return e
}

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    await onSubmit({ ...form, amount: Number(form.amount) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">

        <div>
          <label className="label">Title *</label>
          <input type="text" value={form.title} onChange={handleChange('title')}
            placeholder="e.g. Woolworths groceries" maxLength={100}
            className={`input ${errors.title ? 'border-danger' : ''}`} />
          {errors.title && <p className="text-danger text-xs mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Amount (AUD) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-mono">$</span>
              <input type="number" step="0.01" min="0.01" value={form.amount}
                onChange={handleChange('amount')} placeholder="0.00"
                className={`input pl-7 ${errors.amount ? 'border-danger' : ''}`} />
            </div>
            {errors.amount && <p className="text-danger text-xs mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label className="label">Category *</label>
            <select value={form.category} onChange={handleChange('category')}
              className="input appearance-none cursor-pointer">
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Date *</label>
          <input type="date" value={form.date} onChange={handleChange('date')}
            className={`input ${errors.date ? 'border-danger' : ''}`} />
          {errors.date && <p className="text-danger text-xs mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea value={form.description} onChange={handleChange('description')}
            placeholder="Optional notes..." rows={3} maxLength={500}
            className="input resize-none" />
        </div>

      </div>

      <div className="flex gap-3 mt-6">
        <button type="button" onClick={onCancel} className="btn-ghost flex-1">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? 'Saving...' : initial ? 'Save Changes' : 'Add Expense'}
        </button>
      </div>
    </form>
  )
}