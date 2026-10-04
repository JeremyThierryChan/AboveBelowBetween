import { Link } from 'react-router-dom'
import { boundaries, deliveryFlow, faq, serviceTiers } from '@/content/services'
import { brand } from '@/content/brand'
import { Page, PageHeader, Section, Notice } from '@/components/layout/Page'
import { useRevealOnMount } from '@/hooks/useReveal'

export function ServicesPage() {
  const scope = useRevealOnMount<HTMLDivElement>()

  return (
    <Page>
      <div ref={scope}>
        <PageHeader
          kicker="Services"
          title="服务与流程"
          lead="每一档解决的是一个不同深度的问题。你可能只需要最轻的那一档——如果判断是这样，我们会直接告诉你。"
        />

        {/* ---------- 三档服务 ---------- */}
        <Section>
          <div className="space-y-5">
            {serviceTiers.map((t) => (
              <article key={t.key} data-anim className="card-raised p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="font-display text-[22px]" style={{ color: 'var(--fg)' }}>
                    {t.name}
                  </h2>
                  <span
                    className="text-[10.5px] tracking-[0.16em] uppercase"
                    style={{ color: 'var(--fg-subtle)' }}
                  >
                    {t.latin}
                  </span>
                </div>

                <p className="mt-3 text-[14px] leading-[1.9]" style={{ color: 'var(--fg-muted)' }}>
                  {t.fit}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 text-[11.5px] tracking-widest" style={{ color: 'var(--gold-accent)' }}>
                      包含
                    </p>
                    <ul className="space-y-2">
                      {t.includes.map((i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 text-[13px] leading-[1.8]"
                          style={{ color: 'var(--fg-muted)' }}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[8px] block size-1 shrink-0 rounded-full"
                            style={{ background: 'var(--gold-accent)' }}
                          />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-3 text-[11.5px] tracking-widest" style={{ color: 'var(--fg-subtle)' }}>
                      不适合
                    </p>
                    <ul className="space-y-2">
                      {t.notForWhom.map((n) => (
                        <li
                          key={n}
                          className="text-[13px] leading-[1.8]"
                          style={{ color: 'var(--fg-subtle)' }}
                        >
                          · {n}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[12.5px] leading-[1.8]" style={{ color: 'var(--fg-subtle)' }}>
                      需要准备：{t.preparation}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div data-anim className="mt-6">
            <Notice title="关于价格">
              我们不在公开页面列出价格。每个问题需要的工作量差别很大，一句「多少钱」很难回答得公平；
              更重要的是，价格应该建立在你说明情况之后，而不是之前。如果你只是想确认一件事，
              我们会直接告诉你最轻的那一档就够。
            </Notice>
          </div>
        </Section>

        {/* ---------- 交付流程 ---------- */}
        <Section title="一次服务是怎么完成的" note="全程不超过 3 天。这是我们对「可预期」的定义。">
          <ol className="grid gap-5 sm:grid-cols-2">
            {deliveryFlow.map((f) => (
              <li key={f.step} data-anim className="card-raised p-6">
                <span
                  className="font-display text-[28px] leading-none"
                  style={{ color: 'var(--accent)', opacity: 0.5 }}
                >
                  {f.step}
                </span>
                <h3 className="mt-3 text-[14.5px] font-semibold" style={{ color: 'var(--fg)' }}>
                  {f.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-[1.85]" style={{ color: 'var(--fg-muted)' }}>
                  {f.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------- 边界 ---------- */}
        <Section title="我们不做什么" note="愿意把边界说清楚的人，才值得你花时间。">
          <div className="space-y-5">
            {[
              { title: '不承诺', items: boundaries.promise, tone: 'warn' as const },
              { title: '不接的事', items: boundaries.refuse, tone: 'warn' as const },
              { title: '伦理与转介', items: boundaries.ethics, tone: 'good' as const },
            ].map((group) => (
              <div key={group.title} data-anim>
                <Notice tone={group.tone} title={group.title}>
                  <ul className="space-y-2.5">
                    {group.items.map((i) => (
                      <li key={i} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[8px] block size-1 shrink-0 rounded-full"
                          style={{ background: 'currentColor', opacity: 0.5 }}
                        />
                        {i}
                      </li>
                    ))}
                  </ul>
                </Notice>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- FAQ ---------- */}
        <Section title="常见问题">
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {faq.map((item) => (
              <details key={item.q} data-anim className="group py-5">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px]"
                  style={{ color: 'var(--fg)' }}
                >
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[18px] leading-none transition-transform group-open:rotate-45"
                    style={{ color: 'var(--accent)' }}
                  >
                    +
                  </span>
                </summary>
                <p
                  className="mt-3.5 pr-6 text-[13.5px] leading-[1.95]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <Section>
          <div data-anim className="card-raised p-7 text-center">
            <p className="font-display text-[17px]" style={{ color: 'var(--accent)' }}>
              {brand.motto}
            </p>
            <p className="mt-4 text-[13px] leading-[1.9]" style={{ color: 'var(--fg-muted)' }}>
              想聊的话，先在平台上说一句你现在最想弄清楚的事。我们会先判断需不需要进入正式服务——
              很多问题三句话就能解决，那就不必付费。
            </p>
            <Link
              to="/legal"
              className="mt-6 inline-block text-[12.5px]"
              style={{ color: 'var(--accent)' }}
            >
              先读服务须知 →
            </Link>
          </div>
        </Section>
      </div>
    </Page>
  )
}
