import React, { useEffect, useMemo, useState } from 'react'

const platforms = [
  { key: 'youtube', name: 'YouTube', pattern: /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)\w+/i, color: 'text-red-500' },
  { key: 'facebook', name: 'Facebook', pattern: /facebook\.com\/(?:watch|reel|video)/i, color: 'text-blue-600' },
  { key: 'instagram', name: 'Instagram', pattern: /instagram\.com\/(?:reel|p|tv)\//i, color: 'text-pink-500' },
  { key: 'tiktok', name: 'TikTok', pattern: /tiktok\.com\//i, color: 'text-black' },
  { key: 'snapchat', name: 'Snapchat', pattern: /snapchat\.com\//i, color: 'text-yellow-500' },
]

function PlatformBadge({ platform }) {
  if (!platform) return null
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-sm font-medium shadow-sm">
      <span className={`h-2 w-2 rounded-full ${platform.key === 'tiktok' ? 'bg-slate-900' : ''}`}></span>
      <span className={`${platform.color}`}>{platform.name}</span>
    </div>
  )
}

export default function InputWithDetect({ value, onChange, onSubmit }) {
  const [focused, setFocused] = useState(false)
  const platform = useMemo(() => {
    if (!value) return null
    return platforms.find(p => p.pattern.test(value)) || null
  }, [value])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && value) onSubmit?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [value, onSubmit])

  return (
    <div className={`relative w-full max-w-2xl mx-auto`}> 
      <div className={`group relative rounded-2xl border ${focused ? 'border-white/60' : 'border-white/20'} bg-white/10 backdrop-blur-xl shadow-inner transition-all`}> 
        <input
          aria-label="Paste video link"
          placeholder="Paste YouTube, Facebook, Instagram, TikTok or Snapchat link"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-2xl bg-transparent px-5 py-5 text-white placeholder-white/70 focus:outline-none"
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      </div>
      <div className="absolute -bottom-8 left-2">
        <PlatformBadge platform={platform} />
      </div>
    </div>
  )
}
