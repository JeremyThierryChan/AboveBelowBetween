import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { HomePage } from '@/pages/HomePage'
import { SystemsPage } from '@/pages/SystemsPage'
import { SystemDetailPage } from '@/pages/SystemDetailPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { AboutPage } from '@/pages/AboutPage'
import { LegalPage } from '@/pages/LegalPage'

/**
 * 路由基路径
 *
 * GitHub Pages 部署在仓库子路径（/AboveBelowBetween/），
 * BrowserRouter 必须用同一个 basename，否则导航与深链都会错。
 * 该值来自 vite.config.ts 的 base —— Vite 注入为 BASE_URL，末尾带 /，故去掉。
 */
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route element={<SiteChrome />}>
          <Route index element={<HomePage />} />
          <Route path="systems" element={<SystemsPage />} />
          <Route path="systems/:key" element={<SystemDetailPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="legal" element={<LegalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
