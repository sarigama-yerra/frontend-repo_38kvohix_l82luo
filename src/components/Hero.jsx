import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ children }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28 md:py-36 text-center text-white">
        {children}
      </div>
    </section>
  )
}
