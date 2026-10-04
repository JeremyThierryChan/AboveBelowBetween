import { Link } from 'react-router-dom'
import { systems, tierMeta, type SystemTier } from '@/content/systems'
import { Page, PageHeader, Section } from '@/components/layout/Page'
import { useRevealOnMount } from '@/hooks/useReveal'

/**
 * 体系分组展示
 *
 * 分组逻辑：按「你拿它回答什么问题」分三层
 *   命理层（Structure）—— 看整体结构与节奏，需出生信息
 *   占问层（Inquiry）—— 针对具体一件事
 *   工具层（Tools）—— 最简单，靠自己的手与身体
 *
 * 不用「东方／西方」分组：灵摆不属于任何一边，这个分法会失效。
 */
const TIER_ORDER: SystemTier[] = ['destiny', 'inquiry', 'tool']

export function SystemsPage() {
  const scope = useRevealOnMount<HTMLDivElement>()

  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    meta: tierMeta[tier],
    items: systems.filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0)

  return (
    <Page width="wide">
      <div ref={scope}>
        <PageHeader
          kicker="Systems"
          title={`${systems.length} 个体系`}
          lead="它们回答的问题并不一样，所以问你「想问什么」，比问你「想用哪个」更早。下面按功能分三层。"
        />

        {/* 分层速览 */}
        <div data-anim className="mb-4 grid gap-3 sm:grid-cols-3">
          {grouped.map((g) => (
            <div
              key={g.tier}
              className="rounded-sm p-4"
              style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[15px]" style={{ color: 'var(--accent)' }}>
                  {g.meta.label}
                </span>
                <span
                  className="text-[10px] tracking-[0.16em] uppercase"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  {g.meta.english}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.75]" style={{ color: 'var(--fg-muted)' }}>
                {g.meta.note}
              </p>
            </div>
          ))}
        </div>

        {grouped.map((g) => (
          <Section key={g.tier} title={g.meta.label} note={g.meta.note}>
            <div className="grid gap-5 md:grid-cols-2">
              {g.items.map((s) => (
                <article key={s.key} data-anim className="card-raised flex flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="block h-8 w-1 rounded-full"
                      style={{ background: s.hue }}
                    />
                    <div>
                      <h3
                        className="font-display text-[22px] leading-none"
                        style={{ color: 'var(--fg)' }}
                      >
                        {s.name}
                      </h3>
                      <p
                        className="mt-1.5 text-[10.5px] tracking-[0.14em] uppercase"
                        style={{ color: 'var(--fg-subtle)' }}
                      >
                        {s.latin}
                      </p>
                    </div>
                    <span
                      className="ml-auto rounded-sm px-2 py-0.5 text-[10.5px]"
                      style={{ color: 'var(--fg-subtle)', border: '1px solid var(--border)' }}
                    >
                      {s.tradition}
                    </span>
                  </div>

                  <p className="text-[13.5px] leading-[1.9]" style={{ color: 'var(--fg-muted)' }}>
                    {s.pitch}
                  </p>

                  <div className="mt-5 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                    <p
                      className="mb-2 text-[11.5px] tracking-wider"
                      style={{ color: 'var(--fg-subtle)' }}
                    >
                      适合问
                    </p>
                    <ul className="space-y-1.5">
                      {s.goodFor.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="text-[12.5px]"
                          style={{ color: 'var(--fg-muted)' }}
                        >
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/systems/${s.key}`}
                    className="mt-5 text-[12.5px] transition-opacity hover:opacity-70"
                    style={{ color: 'var(--accent)' }}
                  >
                    展开 {s.name} →
                  </Link>
                </article>
              ))}
            </div>
          </Section>
        ))}
      </div>
    </Page>
  )
}
