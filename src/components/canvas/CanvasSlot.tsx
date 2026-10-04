import type { ReactNode } from 'react'
import { useBreathe } from '@/hooks/useReveal'
import { NodeSigil } from '@/components/sigil/NodeSigil'

export interface CanvasSlotProps {
  /** 槽位标识，与后续 Pixi/R3F 场景注册表的 key 对应 */
  id: string
  /** 显示名，例如「洗牌与抽牌」 */
  label: string
  /** 这个槽位将来要放什么（写成一句人话，方便非技术同事看懂） */
  planned: string[]
  /** 渲染引擎：pixi（2D 场景）/ r3f（3D 场景） */
  engine?: 'pixi' | 'r3f'
  /** 建议宽高比，例如 16/9、1/1、4/3 */
  ratio?: number
  /** 覆盖整个占位区的自定义内容（例如已实现的场景） */
  children?: ReactNode
  className?: string
}

/**
 * 动画占位槽
 *
 * 设计意图：动画尚未实现时，让这块区域看起来是「有意留白」而不是「坏掉了」。
 * 每个槽位都声明了自己将来要承载什么，等对应场景开发完成后，
 * 用同名 key 注册到场景表，把 <Scene /> 作为 children 传进来即可，页面结构不用改。
 *
 * 技术约定：
 *   engine="pixi" → 使用 PixiJS 8 的应用实例（2D 卡牌、排盘、粒子）
 *   engine="r3f"  → 使用 react-three-fiber 的 <Canvas>（3D 星盘、旋转罗盘）
 *
 * 性能约定：
 *   场景应挂载在 IntersectionObserver 可见时才初始化，
 *   离开视口后暂停 ticker —— 单页可能出现多个场景，不能全部常驻渲染。
 */
export function CanvasSlot({
  id,
  label,
  planned,
  engine = 'pixi',
  ratio = 16 / 9,
  children,
  className,
}: CanvasSlotProps) {
  const breatheRef = useBreathe(true)

  // 已实现场景：直接渲染，不再显示占位
  if (children) {
    return (
      <div
        className={className}
        style={{ aspectRatio: String(ratio), width: '100%' }}
        data-scene={id}
        data-engine={engine}
      >
        {children}
      </div>
    )
  }

  return (
    <figure
      ref={breatheRef}
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{
        aspectRatio: String(ratio),
        width: '100%',
        border: '1px dashed var(--border-strong)',
        borderRadius: 4,
        background:
          'linear-gradient(135deg, var(--accent-soft) 0%, transparent 45%, var(--accent-soft) 100%)',
      }}
      data-scene={id}
      data-engine={engine}
      aria-label={`${label}（动画场景待实现）`}
    >
      {/* 品牌水印 */}
      <div className="absolute right-3 bottom-3 opacity-[0.14]">
        <NodeSigil size={72} solidCore showStars={false} />
      </div>

      <figcaption className="relative flex h-full flex-col justify-center gap-3 p-6 sm:p-8">
        <div className="flex items-center gap-2.5">
          <span
            className="rounded-sm px-2 py-0.5 text-[10px] tracking-[0.16em] uppercase"
            style={{
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-line)',
            }}
          >
            {engine}
          </span>
          <span className="text-[11px] tracking-wider" style={{ color: 'var(--fg-subtle)' }}>
            动画场景 · 待实现
          </span>
        </div>

        <h4 className="font-display text-[17px] sm:text-[19px]" style={{ color: 'var(--fg)' }}>
          {label}
        </h4>

        <ul className="mt-1 space-y-1.5">
          {planned.map((p) => (
            <li
              key={p}
              className="flex items-start gap-2 text-[12.5px] leading-relaxed"
              style={{ color: 'var(--fg-muted)' }}
            >
              <span
                aria-hidden="true"
                className="mt-[7px] block size-1 shrink-0 rounded-full"
                style={{ background: 'var(--gold-accent)' }}
              />
              {p}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
