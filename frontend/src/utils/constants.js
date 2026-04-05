export const CATEGORIES = [
  'Food', 'Transport', 'Housing', 'Entertainment',
  'Health', 'Shopping', 'Education', 'Other',
]

export const CATEGORY_COLORS = {
  Food:          '#f59e0b',
  Transport:     '#3b82f6',
  Housing:       '#8b5cf6',
  Entertainment: '#ec4899',
  Health:        '#22c55e',
  Shopping:      '#f97316',
  Education:     '#06b6d4',
  Other:         '#6b7280',
}

export const CATEGORY_ICONS = {
  Food:          '🍜',
  Transport:     '🚌',
  Housing:       '🏠',
  Entertainment: '🎬',
  Health:        '🩺',
  Shopping:      '🛍️',
  Education:     '📚',
  Other:         '📦',
}

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount)

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })