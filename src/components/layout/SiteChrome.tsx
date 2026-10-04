import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { brand, englishNames } from '@/content/brand'
import { systems } from '@/content/systems'
import { useThemeStore } from '@/store/theme'
import { NodeSigil } from '@/components/sigil/NodeSigil'

const NAV = [
  { to: '/', label: '首页', end: true },
  { to: '/systems', label: `${systems.length} 个体系` },
  { to: '/services', label: '服务与流程' },
  { to: '/about', label: '关于星爻间' },
  { to: '/legal', label: '服务须知' },
] as const

export function SiteChrome() {
  const { theme, toggleTheme } = useThemeStore()
  const { pathname } = useLocation()

  // 路由切换后回到顶部（避免长页面切换时停在中间）
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="surface-veil sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label={`${brand.name} 首页`}>
            <NodeSigil size={32} solidCore showStars={false} className="shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[17px] tracking-wide" style={{ color: 'var(--fg)' }}>
                {brand.name}
              </span>
              <span
                className="mt-0.5 text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--fg-subtle)' }}
              >
                {/* 页头空间有限，用缩写；完整英文名见页脚与关于页 */}
                {englishNames.activeAbbr}
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="主导航">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                className="rounded px-3 py-2 text-[13px] transition-colors"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="ml-auto rounded border px-2.5 py-1.5 text-[11px] tracking-wider transition-colors md:ml-2"
            style={{ borderColor: 'var(--border-strong)', color: 'var(--fg-muted)' }}
            aria-label={theme === 'domestic' ? '切换到暗紫星图主题' : '切换到东方留白主题'}
            title={theme === 'domestic' ? '海外主题' : '国内主题'}
          >
            {theme === 'domestic' ? '东方留白' : '暗紫星图'}
          </button>
        </div>

        {/* 移动端导航 */}
        <nav
          className="flex items-center gap-1 overflow-x-auto border-t px-4 py-2 md:hidden"
          style={{ borderColor: 'var(--border)' }}
          aria-label="主导航（移动端）"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className="shrink-0 rounded px-3 py-1.5 text-[12px]"
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                background: isActive ? 'var(--accent-soft)' : 'transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <NodeSigil size={30} solidCore showStars={false} />
              <span className="font-display text-[16px]">{brand.name}</span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {brand.tagline}
            </p>
            <p className="mt-1 text-[12px]" style={{ color: 'var(--fg-subtle)' }}>
              {brand.subline}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-[13px]" aria-label="页脚导航">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors"
                style={{ color: 'var(--fg-muted)' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="rule-gold my-9" />

        <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>
          {brand.disclaimerFull}
        </p>
        <p className="mt-3 text-[11.5px]" style={{ color: 'var(--fg-subtle)' }}>
          © {new Date().getFullYear()} {brand.name} · {brand.latinName}
        </p>
        <p className="mt-1 text-[11.5px]" style={{ color: 'var(--fg-subtle)' }}>
          {englishNames.taglineEn}
        </p>
      </div>
    </footer>
  )
}
