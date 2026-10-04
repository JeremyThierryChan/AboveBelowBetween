/**
 * 主视觉符号几何参数（单一数据源）
 *
 * SVG 组件、CanvasSlot 占位槽、未来的 Pixi/R3F 场景都必须从这里取几何，
 * 保证品牌符号在所有渲染层里完全一致。
 *
 * 坐标系：100 × 100 的单位空间（避免 0–1 的亚像素描边与精度问题）。
 * 需要归一化坐标时用 toUnit()。
 */

export const VIEW = 100

/** 上圆 = 星（天） */
export const UPPER = { cx: 50, cy: 34, r: 30 } as const
/** 下圆 = 爻（地） */
export const LOWER = { cx: 50, cy: 66, r: 30 } as const

export const STROKE = {
  outer: 2.2,
  knot: 2.8,
} as const

/**
 * 交叠区内的绳结路径 = 「爻」的示意
 * 三段上下交错，中间交叉，对应《说文》「爻，交也」。
 */
export const KNOT = `
  M 42 44 C 46 47, 54 47, 58 44
  M 42 50 C 46 47, 54 47, 58 50
  M 42 56 C 46 53, 54 53, 58 56
`

/** 上圆内的星点（cx, cy, r） */
export const STARS = [
  { cx: 40, cy: 30, r: 1.4 },
  { cx: 59, cy: 24, r: 1.1 },
  { cx: 52, cy: 43, r: 0.9 },
] as const

/** 把 100 单位坐标换算为 0–1 归一化坐标，供 Canvas/WebGL 使用 */
export function toUnit(v: number): number {
  return v / VIEW
}

/**
 * 交叠区（间）的包围盒，供 Canvas 裁剪与高亮使用。
 * 由两圆交点解析求出，不依赖渲染结果。
 */
export function coreBounds() {
  // 两圆圆心距
  const d = LOWER.cy - UPPER.cy
  // 交点纵坐标（两圆等高半径，交点位于两心连线中垂线）
  const midY = (UPPER.cy + LOWER.cy) / 2
  // 半弦长 = sqrt(r² − (d/2)²)
  const halfChord = Math.sqrt(Math.max(0, UPPER.r ** 2 - (d / 2) ** 2))

  return {
    left: UPPER.cx - halfChord,
    right: UPPER.cx + halfChord,
    top: midY - halfChord * 0,
    bottom: midY,
    width: halfChord * 2,
    height: halfChord,
    /** 交叠区中心 */
    center: { cx: UPPER.cx, cy: midY },
  }
}
