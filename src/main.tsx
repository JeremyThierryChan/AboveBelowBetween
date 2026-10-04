import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

/**
 * GitHub Pages 深链还原
 *
 * index.html 的兜底脚本在 404 时会把原始路径转成 ?redirect= 送回首页。
 * 这里在 React 挂载前把它还原成真正的路径，让 BrowserRouter 能正确匹配。
 *
 * 例如：/AboveBelowBetween/systems/bazi
 *   → 404.html 跳到 /AboveBelowBetween/?redirect=systems%2Fbazi
 *   → 这里 history.replaceState 成 /AboveBelowBetween/systems/bazi
 */
function restoreDeepLink() {
  const params = new URLSearchParams(window.location.search)
  const redirect = params.get('redirect')
  if (!redirect) return

  const base = import.meta.env.BASE_URL // 形如 /AboveBelowBetween/
  const target = base + redirect.replace(/^\//, '')
  window.history.replaceState(null, '', target)
}

restoreDeepLink()

// 首屏前应用主题，避免闪烁
const saved = localStorage.getItem('xyj-theme')
try {
  const parsed = saved ? JSON.parse(saved) : null
  const theme = parsed?.state?.theme
  document.documentElement.dataset.theme = theme === 'overseas' ? 'overseas' : 'domestic'
} catch {
  document.documentElement.dataset.theme = 'domestic'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
