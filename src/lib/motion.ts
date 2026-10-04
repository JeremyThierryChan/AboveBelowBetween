/**
 * 动效令牌与 GSAP 统一配置
 * 依据：品牌视觉规范 —— 节奏要"克制、可预期"，不做浮夸弹跳
 */

/** 与 CSS 变量保持一致的缓动 */
export const EASE = {
  /** 品牌主缓动：出场、进场、位移 */
  brand: 'power3.out',
  /** 印记缓动：适合"方方正正"的机关感动作（排盘、罗盘） */
  sigil: 'power4.inOut',
  /** 呼吸缓动：循环类动作（光晕、星点） */
  breathe: 'sine.inOut',
  /** 回弹：仅用于卡牌落桌 */
  settle: 'back.out(1.4)',
} as const

/** 统一时长（秒） */
export const DURATION = {
  instant: 0.12,
  fast: 0.22,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.2,
} as const

/** 交错节奏（秒） */
export const STAGGER = {
  tight: 0.04,
  base: 0.07,
  loose: 0.14,
} as const

/** 入场基础位移（px），供 GSAP 与占位槽共用 */
export const ENTRANCE = {
  rise: 16,
  drift: 24,
} as const

/** 后续动画场景的统一时长基准，方便整体调速 */
export const SCENE = {
  /** 洗牌 */
  shuffle: 0.9,
  /** 单张抽牌 */
  drawCard: 0.55,
  /** 翻牌 */
  flipCard: 0.6,
  /** 铜钱单次落定 */
  coinToss: 0.85,
  /** 一次爻线生长 */
  yaoGrow: 0.5,
  /** 排盘整盘星曜飞入 */
  chartFlyIn: 1.6,
  /** 相位连线逐条生长 */
  aspectLine: 0.35,
  /** 蓍草一次分握 */
  yarrowSplit: 1.1,
} as const
