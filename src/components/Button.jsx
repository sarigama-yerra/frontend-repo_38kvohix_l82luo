import React from 'react'

export default function Button({ as = 'button', children, variant = 'primary', size = 'md', className = '', icon: Icon, iconRight: IconRight, ...props }) {
  const Comp = as
  const base = 'inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary:
      'bg-gradient-to-tr from-indigo-600 to-fuchsia-600 text-white hover:from-indigo-500 hover:to-fuchsia-500 focus-visible:ring-indigo-400 ring-offset-slate-900',
    secondary:
      'bg-white/10 text-white hover:bg-white/15 border border-white/20 backdrop-blur-md focus-visible:ring-white/60 ring-offset-slate-900',
    outline:
      'border border-slate-300 text-slate-900 hover:bg-slate-50 focus-visible:ring-indigo-500 ring-offset-white',
    ghost:
      'text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300 ring-offset-white',
    success:
      'bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-300 ring-offset-slate-900',
  }
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-12 px-7 text-lg',
  }

  return (
    <Comp className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon ? <Icon className="mr-2 h-5 w-5" aria-hidden /> : null}
      <span>{children}</span>
      {IconRight ? <IconRight className="ml-2 h-5 w-5" aria-hidden /> : null}
    </Comp>
  )
}
