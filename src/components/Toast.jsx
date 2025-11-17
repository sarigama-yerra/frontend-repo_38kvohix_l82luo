import React, { useEffect } from 'react'

export default function Toast({ show, title, description, variant = 'success', onClose }) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => onClose?.(), 3000)
    return () => clearTimeout(t)
  }, [show, onClose])

  if (!show) return null
  const colors = variant === 'success'
    ? 'bg-emerald-500/90 text-white'
    : 'bg-rose-500/90 text-white'

  return (
    <div role="status" aria-live="polite" className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl px-5 py-3 shadow-lg backdrop-blur ${colors}`}>
      <div className="font-semibold">{title}</div>
      {description ? <div className="text-sm opacity-90">{description}</div> : null}
    </div>
  )
}
