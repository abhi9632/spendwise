import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null)
  const panelRef   = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && panelRef.current) {
      const focusable = panelRef.current.querySelector(
        'button, input, select, textarea'
      )
      focusable?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="modal-overlay fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div ref={panelRef} className="modal-panel w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display font-bold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-white hover:bg-surface transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}