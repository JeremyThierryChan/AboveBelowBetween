import { KNOT, LOWER, STARS, STROKE, UPPER, VIEW } from './sigil-data'

export interface NodeSigilProps {
  size?: number
  className?: string
  /** 是否播放"双圆相合"入场动画 */
  animate?: boolean
  /** 交叠区是否为实心（小尺寸时建议 true，视觉更清晰） */
  solidCore?: boolean
  /** 是否绘制上圆内的星点 */
  showStars?: boolean
}

/**
 * 星爻间 · 主视觉符号
 *
 * 结构：上圆 = 星（天）／下圆 = 爻（地）／交叠区 = 间（人）
 * 交叠区内的绳结取自「爻」的古文字形，呼应《说文》「爻，交也」。
 *
 * 纯 SVG，可无损缩放；用于头像、水印、封面、页脚。
 * Canvas / WebGL 场景请从 sigil-data.ts 取同一份几何参数，保证一致。
 */
export function NodeSigil({
  size = 120,
  className,
  animate = false,
  solidCore = false,
  showStars = true,
}: NodeSigilProps) {
  // 同一页面可能出现多个实例，id 必须唯一
  const uid = `sg${Math.round(size)}${solidCore ? 's' : 'o'}${animate ? 'a' : ''}`

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      fill="none"
      className={className}
      role="img"
      aria-label="星爻间标志：上圆为星，下圆为爻，交叠处为间"
    >
      <defs>
        <clipPath id={`${uid}-upper`}>
          <circle cx={UPPER.cx} cy={UPPER.cy} r={UPPER.r} />
        </clipPath>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--sigil-stroke)" />
          <stop offset="60%" stopColor="var(--gold-accent)" />
          <stop offset="100%" stopColor="var(--sigil-stroke)" />
        </linearGradient>
      </defs>

      {/* 上圆 · 星（天） */}
      <circle
        cx={UPPER.cx}
        cy={UPPER.cy}
        r={UPPER.r}
        stroke="var(--sigil-stroke)"
        strokeWidth={STROKE.outer}
        className={animate ? 'motion-safe:sigil-form-upper' : undefined}
        style={{ transformOrigin: '50px 34px' }}
      />

      {/* 下圆 · 爻（地） */}
      <circle
        cx={LOWER.cx}
        cy={LOWER.cy}
        r={LOWER.r}
        stroke="var(--sigil-stroke)"
        strokeWidth={STROKE.outer}
        className={animate ? 'motion-safe:sigil-form-lower' : undefined}
        style={{ transformOrigin: '50px 66px' }}
      />

      {/* 交叠区 · 间（人）：用上圆裁剪下圆得到 */}
      <g clipPath={`url(#${uid}-upper)`}>
        <circle
          cx={LOWER.cx}
          cy={LOWER.cy}
          r={LOWER.r}
          fill={solidCore ? 'var(--sigil-stroke)' : 'var(--sigil-fill)'}
          opacity={solidCore ? 0.92 : 1}
        />
      </g>

      {/* 交叠区内的绳结 · 爻 */}
      <path
        d={KNOT}
        stroke={`url(#${uid}-gold)`}
        strokeWidth={STROKE.knot}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 星辰 */}
      {showStars && (
        <g fill="var(--gold-accent)" opacity={0.85}>
          {STARS.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} />
          ))}
        </g>
      )}
    </svg>
  )
}

/** 仅交叠区（间）：用于 favicon、头像裁切、加载态 */
export function SigilCore({ size = 48, className }: { size?: number; className?: string }) {
  const uid = `core${Math.round(size)}`
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={uid}>
          <circle cx={UPPER.cx} cy={UPPER.cy} r={UPPER.r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid})`}>
        <circle cx={LOWER.cx} cy={LOWER.cy} r={LOWER.r} fill="var(--sigil-stroke)" opacity={0.2} />
      </g>
      <path
        d={KNOT}
        stroke="var(--sigil-stroke)"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
