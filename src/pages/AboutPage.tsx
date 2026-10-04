import { brand, etymology, statement, triad } from '@/content/brand'
import { systems } from '@/content/systems'
import { Page, PageHeader, Section, Notice } from '@/components/layout/Page'
import { NodeSigil } from '@/components/sigil/NodeSigil'
import { useRevealOnMount } from '@/hooks/useReveal'

export function AboutPage() {
  const scope = useRevealOnMount<HTMLDivElement>()

  const eastSystems = systems.filter((s) => s.tradition === '东方')
  const westSystems = systems.filter((s) => s.tradition === '西方')
  const generalSystems = systems.filter((s) => s.tradition === '通用')

  return (
    <Page>
      <div ref={scope}>
        <PageHeader kicker="About" title="关于星爻间" lead={brand.tagline} />

        {/* ---------- 名字 ---------- */}
        <Section title="为什么叫这个名字">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <div data-anim className="shrink-0">
              <NodeSigil size={140} solidCore={false} animate showStars />
            </div>

            <div className="space-y-5">
              {statement.fullBody.map((p, i) => (
                <p
                  key={i}
                  data-anim
                  className="text-[14px] leading-[2]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {p}
                </p>
              ))}
              <p data-anim className="text-[14px] leading-[2]" style={{ color: 'var(--fg-muted)' }}>
                {etymology.text}
                {etymology.note}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {triad.map((t) => (
              <div key={t.key} data-anim className="card-raised p-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[30px] leading-none" style={{ color: 'var(--accent)' }}>
                    {t.glyph}
                  </span>
                  <span className="text-[11px] tracking-widest" style={{ color: 'var(--fg-subtle)' }}>
                    {t.realm}
                  </span>
                </div>
                <p className="mt-3 text-[12.5px] leading-[1.8]" style={{ color: 'var(--fg-muted)' }}>
                  {t.note}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- 我们是谁 ---------- */}
        <Section title="我们是谁" note="一个两人的工作室。我们刻意保持小。">
          <div className="space-y-5">
            <p data-anim className="text-[14px] leading-[2]" style={{ color: 'var(--fg-muted)' }}>
              星爻间是一个两人的工作室：一位负责解读与体系，一位负责把这件事做得清楚、可预期、
              并且合规。我们刻意不扩张成一个大团队，因为这门手艺的质量取决于解读时是否足够专注，
              而不是取决于我们接了多少单。
            </p>
            <p data-anim className="text-[14px] leading-[2]" style={{ color: 'var(--fg-muted)' }}>
              我们一共用 {systems.length} 个体系，分三层：{eastSystems.length} 套东方命理与占问（{eastSystems
                .map((s) => s.name)
                .join('、')}）、{westSystems.length} 套西方体系（{westSystems
                .map((s) => s.name)
                .join('、')}），以及 {generalSystems.length} 个通用工具（
              {generalSystems.map((s) => s.name).join('、')}
              ）。这不是为了显得丰富，而是因为它们回答的问题不一样：一个擅长说「什么时候」，这不是为了显得丰富，而是因为它们回答的问题不一样：一个擅长说「什么时候」，
              一个擅长说「你是什么结构」。同时用，是为了少一点盲区。
            </p>
          </div>
        </Section>

        {/* ---------- 方法论 ---------- */}
        <Section title="我们的方法论" note="三句话。">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                t: '先问清楚，再回答',
                b: '大部分人来的时候，问的都不是真正的问题。「他会不会回来」背后往往是「我还要不要等他」。所以我们通常有一半时间花在把问题问清楚上。',
              },
              {
                t: '给选项，不给判决',
                b: '任何一次解读都会给出 2–3 个选项，以及每个选项的代价。因为把决定权拿走，等于把责任也拿走了——那不是帮你。',
              },
              {
                t: '给时间窗，不给命运',
                b: '我们会说「哪段时间压力大、哪段时间适合推动」，但不会说「你注定如何」。前者你能用，后者只会让你焦虑。',
              },
            ].map((m) => (
              <div key={m.t} data-anim className="card-raised p-6">
                <h3 className="text-[14px] font-semibold" style={{ color: 'var(--fg)' }}>
                  {m.t}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.9]" style={{ color: 'var(--fg-muted)' }}>
                  {m.b}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- 合规与伦理 ---------- */}
        <Section title="合规与伦理" note="这一节不是免责声明，是我们的经营前提。">
          <div className="space-y-5">
            <Notice tone="warn" title="我们的服务性质">
              {brand.disclaimerFull}
            </Notice>
            <Notice tone="good" title="我们主动做的事">
              拒绝任何形式的控制他人意志的委托；不使用「不做会出大事」这类话术；如果你已经开始
              依赖占卜来做日常决定，我们会主动建议你停下来；涉及医疗、法律、投资或心理危机时，
              我们会明确转介到专业机构，并且不收取那次服务的费用。
            </Notice>
          </div>
        </Section>

        {/* ---------- 正在建的东西 ---------- */}
        <Section
          title="这个网站正在建什么"
          note="我们正在把五套体系做成可以在屏幕上真实操作的东西——不是图片，是有手感、有节奏的交互。"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              '塔罗：洗牌、切牌、抽牌、翻牌的牌桌手感',
              '六爻：三枚铜钱掷落与蓍草分握的起卦过程',
              '奇门遁甲：九宫排盘与星门神逐层飞入',
              '大六壬：月将加时的天地盘旋转与三传生长',
              '西方占星：星盘连线与行运时间轴',
            ].map((item) => (
              <li
                key={item}
                data-anim
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
        </Section>

        <Section>
          <div data-anim className="mx-auto max-w-2xl text-center">
            <div className="rule-gold mx-auto mb-8 max-w-24" />
            <p className="font-display text-[19px] leading-[1.8]" style={{ color: 'var(--accent)' }}>
              {statement.classical[0]}
            </p>
            <p className="font-display text-[19px] leading-[1.8]" style={{ color: 'var(--accent)' }}>
              {statement.classical[1]}
            </p>
          </div>
        </Section>
      </div>
    </Page>
  )
}
