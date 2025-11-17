import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import Button from './components/Button'
import InputWithDetect from './components/InputWithDetect'
import DownloadCard from './components/DownloadCard'
import ProgressBar from './components/ProgressBar'
import Toast from './components/Toast'
import { YoutubeIcon, FacebookIcon, InstagramIcon, TiktokIcon, SnapchatIcon } from './components/Icons'

const features = [
  { label: 'Fast', desc: 'Optimized for quick downloads' },
  { label: 'No login', desc: 'No accounts or signups required' },
  { label: 'Multiple formats', desc: 'MP4, MP3, WebM and more' },
]

function PlatformIconsRow() {
  const iconClass = 'h-6 w-6'
  return (
    <div className="mt-6 flex items-center justify-center gap-5 text-white/80">
      <YoutubeIcon className={`${iconClass} text-red-500`} />
      <FacebookIcon className={`${iconClass} text-blue-500`} />
      <InstagramIcon className={`${iconClass} text-pink-500`} />
      <TiktokIcon className={`${iconClass} text-slate-900 bg-white rounded-sm p-0.5`} />
      <SnapchatIcon className={`${iconClass} text-yellow-400`} />
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="opacity-90">© {new Date().getFullYear()} NovaLoad</div>
        <nav className="flex items-center gap-6">
          <a className="hover:text-white" href="#" aria-label="Privacy">Privacy</a>
          <a className="hover:text-white" href="#" aria-label="Terms">Terms</a>
          <a className="hover:text-white" href="#" aria-label="Contact">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  const [url, setUrl] = useState('')
  const [showPanel, setShowPanel] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [toast, setToast] = useState({ show: false })

  const platform = useMemo(() => {
    if (!url) return null
    if (/youtu/.test(url)) return 'YouTube'
    if (/facebook/.test(url)) return 'Facebook'
    if (/instagram/.test(url)) return 'Instagram'
    if (/tiktok/.test(url)) return 'TikTok'
    if (/snapchat/.test(url)) return 'Snapchat'
    return null
  }, [url])

  const formats = [
    { format: 'MP4', quality: '1080p', size: '48 MB', accent: 'indigo' },
    { format: 'MP4', quality: '720p', size: '28 MB', accent: 'emerald' },
    { format: 'WebM', quality: '480p', size: '16 MB', accent: 'amber' },
    { format: 'MP3', quality: 'Audio only', size: '6 MB', accent: 'emerald' },
  ]

  const handleSubmit = () => {
    if (!url) return
    setShowPanel(true)
    // Here we would call the backend: `${import.meta.env.VITE_BACKEND_URL}/parse?url=${encodeURIComponent(url)}`
  }

  const handleDownload = (item) => {
    setDownloading(true)
    setProgress(8)
    // Simulated progress; in production, stream progress from API (Content-Length or SSE)
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id)
          setDownloading(false)
          setToast({ show: true, title: 'Download started', description: `${item.format} ${item.quality}` })
          return 100
        }
        return p + Math.random() * 15
      })
    }, 300)
  }

  useEffect(() => {
    if (!showPanel) {
      setProgress(0)
      setDownloading(false)
    }
  }, [showPanel])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Download videos instantly
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Paste a link from your favorite platform and get high‑quality downloads fast.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <InputWithDetect value={url} onChange={setUrl} onSubmit={handleSubmit} />
            <div className="flex items-center gap-3">
              <Button onClick={handleSubmit} variant="primary" size="lg">Download</Button>
              <Button onClick={() => navigator.clipboard.readText().then(t => setUrl(t))} variant="secondary" size="lg">Paste a link</Button>
            </div>
            <PlatformIconsRow />
            <p className="mt-4 text-xs text-white/60 max-w-xl text-center">
              By using this service you agree to only download content you have rights to. Respect the terms of each platform.
            </p>
          </div>
        </motion.div>
      </Hero>

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-6 -mt-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-lg font-semibold">{f.label}</div>
                <p className="mt-1 text-sm text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {showPanel ? (
          <section className="mx-auto max-w-6xl px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
                <div className="flex items-start gap-4">
                  <div className="h-28 w-48 rounded-lg bg-white/10 animate-pulse" aria-hidden />
                  <div>
                    <div className="text-xl font-semibold">Sample Video Title</div>
                    <div className="mt-1 text-sm text-white/70">{platform || 'Unknown platform'} • 5:23</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {formats.map((opt) => (
                    <DownloadCard key={opt.format + opt.quality} {...opt} onClick={() => handleDownload(opt)} disabled={downloading} />
                  ))}
                </div>

                {downloading ? (
                  <div className="mt-6">
                    <ProgressBar value={Math.min(progress, 100)} label="Preparing download" />
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
                <div className="font-semibold">Recent downloads</div>
                <p className="mt-2 text-sm text-white/70">Local history appears here once you start downloading.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
                <div className="font-semibold">How it works</div>
                <ol className="mt-2 space-y-2 text-sm text-white/80 list-decimal pl-5">
                  <li>Paste a link above</li>
                  <li>Choose your preferred format</li>
                  <li>Click to download</li>
                </ol>
              </div>
            </aside>
          </section>
        ) : null}
      </main>

      <Footer />

      <Toast show={toast.show} title={toast.title} description={toast.description} onClose={() => setToast({ show: false })} />
    </div>
  )
}
