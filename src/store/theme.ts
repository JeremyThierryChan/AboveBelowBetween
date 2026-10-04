import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { THEMES, type ThemeName } from '@/lib/brand'

interface ThemeState {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  toggleTheme: () => void
}

/**
 * 主题状态：domestic（东方留白）/ overseas（暗紫星图）
 * 写入 <html data-theme>，由 CSS 变量驱动；Canvas 场景从 lib/brand.ts 读色板。
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'domestic',
      setTheme: (theme) => {
        document.documentElement.dataset.theme = theme
        set({ theme })
      },
      toggleTheme: () => {
        const next: ThemeName = get().theme === 'domestic' ? 'overseas' : 'domestic'
        document.documentElement.dataset.theme = next
        set({ theme: next })
      },
    }),
    {
      name: 'xyj-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.theme && THEMES.includes(state.theme)) {
          document.documentElement.dataset.theme = state.theme
        }
      },
    },
  ),
)
