/**
 * 品牌令牌（TS 侧镜像）
 * 用途：Canvas / WebGL 场景拿不到 CSS 变量，需要一份 JS 可读的色板。
 * 改色时请同步修改 src/styles/index.css。
 */

export const THEMES = ['domestic', 'overseas'] as const
export type ThemeName = (typeof THEMES)[number]

export interface BrandPalette {
  bg: string
  bgRaised: string
  fg: string
  fgMuted: string
  accent: string
  gold: string
  border: string
}

/** Canvas/WebGL 用色板 */
export const PALETTE: Record<ThemeName, BrandPalette> = {
  domestic: {
    bg: '#f7f5f2',
    bgRaised: '#ffffff',
    fg: '#1e2126',
    fgMuted: '#5a5f66',
    accent: '#6b4a8f',
    gold: '#a8863f',
    border: '#e2ded7',
  },
  overseas: {
    bg: '#111316',
    bgRaised: '#191c21',
    fg: '#f4efe6',
    fgMuted: '#a9a49b',
    accent: '#8b6bb1',
    gold: '#c9a84c',
    border: '#262a30',
  },
}

/** 星爻间主视觉：双圆交叠（上圆=星/天，下圆=爻/地，交叠处=间/人） */
export const SIGIL = {
  /** 上圆（星）圆心与半径，单位为 0-1 归一化坐标 */
  upper: { cx: 0.5, cy: 0.34, r: 0.3 },
  /** 下圆（爻） */
  lower: { cx: 0.5, cy: 0.66, r: 0.3 },
} as const
