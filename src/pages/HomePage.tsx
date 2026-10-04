import { Link } from 'react-router-dom'
import { brand, etymology, statement, triad } from '@/content/brand'
import { systems } from '@/content/systems'
import { serviceTiers } from '@/content/services'
import { Page, Section, Notice } from '@/components/layout/Page'
import { NodeSigil } from '@/components/sigil/NodeSigil'
import { CanvasSlot } from '@/components/canvas/CanvasSlot'
import { useRevealOnMount } from '@/hooks/useReveal'

export function HomePage() {
  const scope = useRevealOnMount<HTMLDivElement>()

  return (
    <div ref={scope}>
      {/* ============ 主视觉 ============ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] opacity-[0.06]"
        >
          <NodeSigil size={520} solidCore={false} showStars />
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
          <div className="max-w-2xl">
            <p
              data-anim
              className="mb-5 text-[11px] tracking-[0.3em] uppercase"
              style={{ color: 'var(--gold-accent)' }}
            >
              {brand.latinName} · 东西方双体系
            </p>

            <h1
              data-anim
              className="font-display text-[32px] leading-[1.3] sm:text-[46px] sm:leading-[1.25]"
              style={{ color: 'var(--fg)' }}
            >
              {statement.hero}
            </h1>

            <div data-anim className="rule-gold my-7 max-w-32" />

            <div data-anim className="space-y-1.5">
              {statement.full.map((line) => (
                <p
                  key={line}
                  className="font-display text-[17px] sm:text-[20px]"
                  style={{ color: 'var(--accent)' }}
                >
                  {line}
                </p>
              ))}
            </div>

            <p
              data-anim
              className="mt-8 max-w-xl text-[14px] leading-[1.95]"
              style={{ color: 'var(--fg-muted)' }}
            >
              {statement.fullBody[0]}
            </p>

            <div data-anim className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/systems"
                className="rounded-sm px-5 py-3 text-[13.5px] transition-opacity hover:opacity-88"
                style={{ background: 'var(--accent)', color: 'var(--fg-inverse)' }}
              >
                看全部 {systems.length} 个体系
              </Link>
              <Link
                to="/services"
                className="rounded-sm border px-5 py-3 text-[13.5px] transition-colors"
                style={{ borderColor: 'var(--border-strong)', color: 'var(--fg)' }}
              >
                了解服务与流程
              </Link>
            </div>

            <p data-anim className="mt-7 text-[12.5px]" style={{ color: 'var(--fg-subtle)' }}>
              「{brand.motto}」
            </p>
          </div>
        </div>
      </section>

      <Page>
        {/* ============ 三才：名字的来源 ============ */}
        <Section
          title="名字来自三才"
          note="星在天上，爻在地上，而人站在它们之间。这不是修辞，是这个工作室的全部方法论。"
        >
          <div className="grid gap-5 sm:grid-cols-3">
            {triad.map((t) => (
              <article
                key={t.key}
                data-anim
                className="card-raised flex flex-col p-6"
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <span
                    className="font-display text-[40px] leading-none"
                    style={{ color: 'var(--accent)' }}
                  >
                    {t.glyph}
                  </span>
                  <span
                    className="rounded-sm px-2 py-0.5 text-[11px] tracking-widest"
                    style={{
                      background: 'var(--accent-soft)',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent-line)',
                    }}
                  >
                    {t.realm}
                  </span>
                </div>

                <h3 className="text-[14px] font-semibold" style={{ color: 'var(--fg)' }}>
                  {t.note}
                </h3>
                <p
                  className="mt-3 text-[13px] leading-[1.85]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {t.detail}
                </p>
              </article>
            ))}
          </div>

          <div data-anim className="mt-6">
            <Notice title="一个字源上的小事">
              {etymology.text}
              {etymology.note}
            </Notice>
          </div>
        </Section>

        {/* ============ 体系总览 ============ */}
        <Section
          title={`${systems.length} 个体系`}
          note="它们回答的问题不一样，所以问你「想问什么」，比问你「想用哪个」更早。"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {systems.map((s) => (
              <article key={s.key} data-anim className="card-raised flex flex-col p-6">
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="text-[11px] tracking-widest"
                    style={{ color: s.tradition === '东方' ? 'var(--gold-accent)' : 'var(--accent)' }}
                  >
                    {s.tradition}
                  </span>
                  <span className="h-px flex-1" style={{ background: 'var(--border)' }} />
                  <span className="text-[11px]" style={{ color: 'var(--fg-subtle)' }}>
                    {s.latin}
                  </span>
                </div>

                <h3 className="font-display text-[22px]" style={{ color: 'var(--fg)' }}>
                  {s.name}
                </h3>

                <p
                  className="mt-3 flex-1 text-[13.5px] leading-[1.9]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {s.pitch}
                </p>

                <Link
                  to={`/systems/${s.key}`}
                  className="mt-5 text-[12.5px] transition-opacity hover:opacity-70"
                  style={{ color: 'var(--accent)' }}
                >
                  了解 {s.name} →
                </Link>
              </article>
            ))}
          </div>
        </Section>

        {/* ============ 交互场景预告 ============ */}
        <Section
          title="正在建的东西"
          note="下面这些是视觉与交互层，正在开发。它们的作用是让一套古老的体系，在屏幕上有它应有的手感。"
        >
          <CanvasSlot
            id="tarot-table"
            label="卡牌牌桌"
            engine="pixi"
            ratio={16 / 9}
            planned={[
              '洗牌、切牌、展开牌阵的手感与物理反馈',
              '抽牌与翻牌的透视、光泽与落桌回弹',
              '牌面与解读文字的双向联动',
            ]}
          />
        </Section>

        {/* ============ 我们的边界 ============ */}
        <Section
          title="我们不做什么"
          note="这一节比上面所有内容都重要。一个愿意说清楚自己边界的人，才值得你花时间。"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-anim className="card-raised p-6">
              <h3 className="mb-4 text-[14px] font-semibold" style={{ color: 'var(--fg)' }}>
                三条底线
              </h3>
              <ul className="space-y-3">
                {[
                  '不承诺结果，只给视角与时间窗。',
                  '不制造恐惧，不拿灾祸做销售钩子。',
                  '遇医疗、法律、投资、心理危机，立刻转介。',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[13px] leading-[1.85]"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[8px] block size-1 shrink-0 rounded-full"
                      style={{ background: 'var(--gold-accent)' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/legal"
                className="mt-5 inline-block text-[12.5px]"
                style={{ color: 'var(--accent)' }}
              >
                看完整服务须知 →
              </Link>
            </div>

            <div data-anim className="card-raised p-6">
              <h3 className="mb-4 text-[14px] font-semibold" style={{ color: 'var(--fg)' }}>
                我们怎么工作
              </h3>
              <ul className="space-y-3">
                {serviceTiers.map((t) => (
                  <li key={t.key} className="text-[13px] leading-[1.85]">
                    <span style={{ color: 'var(--fg)' }}>{t.name}</span>
                    <span className="mx-2" style={{ color: 'var(--border-strong)' }}>
                      ·
                    </span>
                    <span style={{ color: 'var(--fg-muted)' }}>{t.fit}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="mt-5 inline-block text-[12.5px]"
                style={{ color: 'var(--accent)' }}
              >
                看服务与流程 →
              </Link>
            </div>
          </div>
        </Section>

        {/* ============ 收尾 ============ */}
        <Section>
          <div data-anim className="mx-auto max-w-2xl text-center">
            <div className="rule-gold mx-auto mb-8 max-w-24" />
            <p
              className="font-display text-[19px] leading-[1.8] sm:text-[23px]"
              style={{ color: 'var(--accent)' }}
            >
              {statement.classicalSign[0]}
            </p>
            <p className="mt-4 text-[13px]" style={{ color: 'var(--fg-subtle)' }}>
              {brand.closing}
            </p>
          </div>
        </Section>
      </Page>
    </div>
  )
}
