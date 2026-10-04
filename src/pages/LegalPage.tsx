import { brand } from '@/content/brand'
import { Page, PageHeader, Section, Notice } from '@/components/layout/Page'
import { useRevealOnMount } from '@/hooks/useReveal'

/**
 * 服务须知（法务文案）
 * 内容性质：服务须知（免责声明与用户约定）
 *
 * ⚠️ 本文为草案性质，正式对外前建议由专业人士过目。
 * ⚠️ 修改前请确认不出现以下表述：承诺结果／制造恐惧／医疗建议／
 *    法律建议／投资建议。交付前建议由专业人士过目。
 */

const SECTIONS = [
  {
    title: '一、服务性质',
    items: [
      '本工作室提供的所有服务（含牌卡解读、星盘分析、传统命理文化咨询、仪式与手作体验等），属于传统文化体验、自我探索与情绪陪伴性质。',
      '上述服务不构成任何形式的科学预测、医疗诊断、法律意见或投资建议。',
    ],
  },
  {
    title: '二、我们不做什么',
    items: [
      '不承诺任何具体结果（包括但不限于复合、上岸、升职、获利）。',
      '不提供疾病诊断、用药建议或心理治疗。',
      '不提供法律、诉讼、投资、债务相关的决策建议。',
      '不提供任何形式的控制他人意志的服务。',
      '不向未成年人单独提供服务（须监护人知情同意）。',
    ],
  },
  {
    title: '三、你的权利',
    items: [
      '你有权在任何时候停止服务。',
      '交付前 24 小时可全额取消；交付后 7 天内如不满意，可申请退款 50%，或换取一次免费补充解读（两者选一）。',
      '你的个人信息与咨询内容严格保密，未经同意不对外披露。用于案例分享时会完全脱敏，并另行取得你的同意。',
    ],
  },
  {
    title: '四、你的责任',
    items: [
      '你确认已年满 18 周岁（或已获得监护人知情同意）。',
      '你理解所有决定由你自己做出，本服务仅提供参考视角。',
      '若你正处于严重心理困扰或危机状态，请优先寻求专业医疗与心理援助。',
    ],
  },
  {
    title: '五、隐私',
    items: [
      '我们仅收集解读所必需的信息（如出生时间、问题描述），不收集身份证号、银行卡等敏感信息。',
      '信息仅用于本次服务，不用于任何其他用途。',
    ],
  },
  {
    title: '六、我们的自我约束',
    items: [
      '我们不使用恐惧或灾祸作为成交手段。任何以「不做会出大事」为前提的话术，都不是我们。',
      '同一位客户的同一个问题，我们建议一个月内只看一次。反复起卦不会让答案更接近事实。',
      '若发现你已开始依赖占卜来做日常决定，我们会主动建议你停下来，并可以据此结束服务关系。',
      '涉及医疗、法律、投资或心理危机时，我们会明确转介到专业机构。',
    ],
  },
] as const

export function LegalPage() {
  const scope = useRevealOnMount<HTMLDivElement>()

  return (
    <Page width="narrow">
      <div ref={scope}>
        <PageHeader
          kicker="Terms"
          title="服务须知"
          lead="请在下单前阅读。确认即表示你已阅读并同意以下内容。"
        />

        <Notice tone="warn" title="一句话摘要">
          {brand.disclaimerShort}
        </Notice>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title} data-anim>
              <h2 className="font-display text-[17px]" style={{ color: 'var(--fg)' }}>
                {s.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[13.5px] leading-[1.95]"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] block size-1 shrink-0 rounded-full"
                      style={{ background: 'var(--gold-accent)' }}
                    />
                    {i}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <Section title="需要帮助时，请联系专业机构">
          <div data-anim className="card-raised p-6">
            <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--fg-muted)' }}>
              如果你正经历严重的心理困扰，请优先联系专业援助，而不是占卜。
            </p>
            <ul className="mt-4 space-y-2 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
              <li>全国 24 小时心理援助热线：12356</li>
              <li>北京心理危机研究与干预中心：010-82951332</li>
              <li>报警 110 · 急救 120 · 妇女维权 12338</li>
              <li>海外：US 988 · UK 116 123 · findahelpline.com</li>
            </ul>
          </div>
        </Section>

        <Section>
          <div data-anim className="rounded-sm p-6" style={{ background: 'var(--bg-sunken)' }}>
            <p className="text-[12.5px] leading-[1.9]" style={{ color: 'var(--fg-subtle)' }}>
              本页内容为服务说明，不构成法律意见。如涉具体法律问题，请咨询执业律师。
              我们保留在必要时修订本须知的权宜，修订后会在本页更新。
            </p>
            <p className="mt-4 text-[12.5px]" style={{ color: 'var(--fg-subtle)' }}>
              最后更新：2026 年 10 月 · {brand.name}
            </p>
          </div>
        </Section>
      </div>
    </Page>
  )
}
