import React from 'react'

export default function DownloadCard({ format = 'MP4', quality = '1080p', size = '24 MB', onClick, disabled, accent = 'indigo' }) {
  const accentMap = {
    indigo: 'from-indigo-500/15 to-fuchsia-500/15 text-indigo-600',
    emerald: 'from-emerald-500/15 to-teal-500/10 text-emerald-600',
    amber: 'from-amber-500/15 to-orange-500/10 text-amber-600',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left rounded-xl border border-white/15 bg-gradient-to-br ${accentMap[accent]} p-4 hover:border-white/25 transition-colors backdrop-blur disabled:opacity-60`}
      aria-label={`Download ${format} ${quality} approximately ${size}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/80">{format}</div>
          <div className="mt-0.5 text-lg font-semibold text-white">{quality}</div>
        </div>
        <div className="text-sm text-white/70">~{size}</div>
      </div>
    </button>
  )
}
