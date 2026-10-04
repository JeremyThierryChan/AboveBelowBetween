import { Link, useParams } from 'react-router-dom'
import { systems, tierMeta, type SystemKey } from '@/content/systems'
import { Page, PageHeader, Section, Notice } from '@/components/layout/Page'
import { CanvasSlot } from '@/components/canvas/CanvasSlot'
import { useRevealOnMount } from '@/hooks/useReveal'

/** 每个体系的动画场景配置（槽位 id 与后续实现的场景 key 一一对应） */
const SCENES: Record<
  SystemKey,
  { id: string; label: string; engine: 'pixi' | 'r3f'; ratio: number; planned: string[] }
> = {
  tarot: {
    id: 'tarot-table',
    label: '牌桌 · 洗牌与抽牌',
    engine: 'pixi',
    ratio: 16 / 9,
    planned: ['洗牌与切牌的手感反馈', '牌阵展开与逐张抽牌', '翻牌的透视与光泽', '牌面与解读文本联动'],
  },
  bazi: {
    id: 'bazi-pillars',
    label: '四柱与五行',
    engine: 'pixi',
    ratio: 16 / 9,
    planned: ['四柱天干地支依次落位', '五行力量对比的流动与生克关系', '大运流年时间轴推进', '东西方两套读法并置对照'],
  },
  ziwei: {
    id: 'ziwei-palaces',
    label: '十二宫与星曜',
    engine: 'pixi',
    ratio: 1,
    planned: ['十二宫格展开与命名', '主星按顺序飞入安宫', '四化高亮与能量流向', '命宫与身宫的对应关系'],
  },
  meihua: {
    id: 'meihua-trigram',
    label: '起卦 · 上下卦与变卦',
    engine: 'pixi',
    ratio: 16 / 9,
    planned: ['数字或时间起卦的输入过程', '上下卦的生成与组合', '动爻高亮与变卦生长', '体用两组卦象的关系可视化'],
  },
  pendulum: {
    id: 'pendulum-swing',
    label: '灵摆 · 振荡与图表',
    engine: 'pixi',
    ratio: 1,
    planned: ['钟摆物理振荡与阻尼衰减', '方向变化的平滑过渡', '配合灵摆图的移动与停留', '专注度对摆动幅度的影响可视化'],
  },
  liuyao: {
    id: 'liuyao-coins',
    label: '起卦 · 铜钱与蓍草',
    engine: 'pixi',
    ratio: 16 / 9,
    planned: ['三枚铜钱的物理掷落与旋转', '阴阳面判定与高亮', '爻线自下而上逐条生长', '蓍草分握的慢节奏流程'],
  },
  qimen: {
    id: 'qimen-board',
    label: '九宫排盘',
    engine: 'pixi',
    ratio: 1,
    planned: ['九宫格展开与分格', '九星、八门、八神逐层飞入', '三奇六仪高亮与连线', '时间推进时盘面重排'],
  },
  daliuren: {
    id: 'daliuren-plate',
    label: '天地盘与四课三传',
    engine: 'pixi',
    ratio: 1,
    planned: ['月将加时的天地盘旋转', '四课逐层生成', '三传路径生长动画', '天将落位联动高亮'],
  },
  astrology: {
    id: 'astrology-wheel',
    label: '星盘与相位连线',
    engine: 'r3f',
    ratio: 1,
    planned: ['十二宫与黄道展开（3D 可倾斜）', '行星按真实轨道飞入落宫', '相位连线逐条生长', '行运盘与本命盘叠合与时间轴'],
  },
}

export function SystemDetailPage() {
  const { key } = useParams<{ key: string }>()
  const scope = useRevealOnMount<HTMLDivElement>([key])

  const system = systems.find((s) => s.key === key)

  if (!system) {
    return (
      <Page>
        <PageHeader title="没有找到这个体系" />
        <Link to="/systems" className="text-[13px]" style={{ color: 'var(--accent)' }}>
          ← 回到体系总览
        </Link>
      </Page>
    )
  }

  const scene = SCENES[system.key]

  return (
    <Page>
      <div ref={scope}>
        <Link
          to="/systems"
          className="mb-8 inline-block text-[12.5px] transition-opacity hover:opacity-70"
          style={{ color: 'var(--fg-subtle)' }}
        >
          ← 体系总览
        </Link>

        <PageHeader
          kicker={`${tierMeta[system.tier].label} · ${system.tradition} · ${system.latin}`}
          title={system.name}
          lead={system.pitch}
        />

        {/* 动画占位槽 */}
        <Section>
          <CanvasSlot
            id={scene.id}
            label={scene.label}
            engine={scene.engine}
            ratio={scene.ratio}
            planned={scene.planned}
          />
        </Section>

        <Section title="这个体系在做什么">
          <div className="space-y-5">
            {system.about.map((p, i) => (
              <p
                key={i}
                data-anim
                className="text-[14px] leading-[2]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {p}
              </p>
            ))}
          </div>
        </Section>

        <Section title="怎么起卦 / 起盘">
          <p data-anim className="text-[14px] leading-[2]" style={{ color: 'var(--fg-muted)' }}>
            {system.method}
          </p>
        </Section>

        <Section title="适合与不适合">
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-anim className="card-raised p-6">
              <p className="mb-4 text-[12px] tracking-widest" style={{ color: 'var(--gold-accent)' }}>
                适合问
              </p>
              <ul className="space-y-2.5">
                {system.goodFor.map((g) => (
                  <li
                    key={g}
                    className="flex gap-2.5 text-[13px] leading-[1.8]"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[8px] block size-1 shrink-0 rounded-full"
                      style={{ background: 'var(--gold-accent)' }}
                    />
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            <div data-anim className="card-raised p-6">
              <p className="mb-4 text-[12px] tracking-widest" style={{ color: '#a8342f' }}>
                不适合问
              </p>
              <ul className="space-y-2.5">
                {system.notFor.map((n) => (
                  <li
                    key={n}
                    className="flex gap-2.5 text-[13px] leading-[1.8]"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[8px] block size-1 shrink-0 rounded-full"
                      style={{ background: '#a8342f', opacity: 0.6 }}
                    />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section>
          <Notice tone="warn" title="一句必须说的话">
            {system.name}给出的是结构与趋势，不是对结果的保证。任何声称能给你必然结论的人，
            都值得你多问一句为什么。我们会给出选项与代价，决定权始终在你手上。
          </Notice>
        </Section>

        <div data-anim className="mt-14 flex flex-wrap gap-3">
          <Link
            to="/services"
            className="rounded-sm px-5 py-3 text-[13.5px] transition-opacity hover:opacity-88"
            style={{ background: 'var(--accent)', color: 'var(--fg-inverse)' }}
          >
            了解服务与流程
          </Link>
          <Link
            to="/systems"
            className="rounded-sm border px-5 py-3 text-[13.5px]"
            style={{ borderColor: 'var(--border-strong)', color: 'var(--fg)' }}
          >
            看其他体系
          </Link>
        </div>
      </div>
    </Page>
  )
}
