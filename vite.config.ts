import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages 部署说明
 *
 * 站点地址：https://jeremythierrychan.github.io/AboveBelowBetween/
 *
 * ⚠️ 因为部署在「仓库子路径」而不是域名根目录，必须设置 base。
 *    否则 index.html 里引用的 /assets/... 会指向
 *    jeremythierrychan.github.io/assets/...（404）。
 *
 * 若将来改用自定义域名（根路径部署），把 BASE 改成 '/' 即可。
 * 应用侧通过 import.meta.env.BASE_URL 读取该值（见 src/App.tsx）。
 */
const BASE = '/AboveBelowBetween/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 必须用 fileURLToPath 解码：若项目路径含空格或非 ASCII 字符，
      // 直接用 URL.pathname 会保留 %20 等编码，导致构建时找不到文件。
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 5175：避开 5173（Vite 默认，易与其他项目冲突）与 5174
    port: 5175,
    host: '127.0.0.1',
  },
  build: {
    target: 'es2022',
    // 不生成 sourcemap —— 源码里的内部注释不应随产物公开
    sourcemap: false,
    // PIXI 与 three 体积较大，单独分包，避免首屏 bundle 过大
    rollupOptions: {
      output: {
        manualChunks: {
          pixi: ['pixi.js'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
})
