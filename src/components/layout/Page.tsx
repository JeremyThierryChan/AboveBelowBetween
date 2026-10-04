import type { ReactNode } from 'react'

export function Page({
  children,
  width = 'default',
}: {
  children: ReactNode
  width?: 'default' | 'wide' | 'narrow'
}) {
  const max = width === 'wide' ? 'max-w-6xl' : width === 'narrow' ? 'max-w-3xl' : 'max-w-4xl'
  return <div className={`mx-auto w-full ${max} px-5 py-16 sm:px-8 sm:py-20`}>{children}</div>
}

export function PageHeader({
  kicker,
  title,
  lead,
}: {
  kicker?: string
  title: string
  lead?: string
}) {
  return (
    <header className="mb-12 sm:mb-16">
      {kicker && (
        <p
          data-anim
          className="mb-3 text-[11px] tracking-[0.28em] uppercase"
          style={{ color: 'var(--gold-accent)' }}
        >
          {kicker}
        </p>
      )}
      <h1
        data-anim
        className="font-display text-[28px] leading-[1.25] sm:text-[38px]"
        style={{ color: 'var(--fg)' }}
      >
        {title}
      </h1>
      <div data-anim className="rule-gold my-6 max-w-24" />
      {lead && (
        <p
          data-anim
          className="max-w-2xl text-[14.5px] leading-[1.9]"
          style={{ color: 'var(--fg-muted)' }}
        >
          {lead}
        </p>
      )}
    </header>
  )
}

export function Section({
  id,
  title,
  note,
  children,
  className,
}: {
  id?: string
  title?: string
  note?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`mt-16 first:mt-0 sm:mt-20 ${className ?? ''}`}>
      {title && (
        <div data-anim className="mb-6">
          <h2 className="font-display text-[20px] sm:text-[24px]" style={{ color: 'var(--fg)' }}>
            {title}
          </h2>
          {note && (
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>
              {note}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

/** 提示条：用于承载合规声明、重要提醒 */
export function Notice({
  tone = 'neutral',
  title,
  children,
}: {
  tone?: 'neutral' | 'warn' | 'good'
  title?: string
  children: ReactNode
}) {
  const palette = {
    neutral: { bg: 'var(--bg-sunken)', border: 'var(--border-strong)', fg: 'var(--fg-muted)' },
    warn: { bg: 'rgba(168,52,47,0.06)', border: 'rgba(168,52,47,0.28)', fg: '#a8342f' },
    good: { bg: 'rgba(46,107,69,0.06)', border: 'rgba(46,107,69,0.26)', fg: '#2e6b45' },
  }[tone]

  return (
    <div
      data-anim
      className="rounded-sm p-5"
      style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
    >
      {title && (
        <p className="mb-2 text-[13px] font-semibold" style={{ color: palette.fg }}>
          {title}
        </p>
      )}
      <div className="text-[13px] leading-[1.85]" style={{ color: 'var(--fg-muted)' }}>
        {children}
      </div>
    </div>
  )
}
