import React from 'react'

export default function ProgressBar({ value = 0, label = 'Downloading' }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-[width] duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
