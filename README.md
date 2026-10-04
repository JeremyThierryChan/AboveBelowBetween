# 星爻间 · Web 前端

东西方双体系解读的交互与视觉平台。

**当前状态：v0.1.0 — 骨架 + 文字内容 + 动画占位槽。功能交互尚未实现。**

```bash
pnpm install     # 首次
pnpm dev         # 开发：http://127.0.0.1:5175
pnpm build       # 生产构建 → dist/
pnpm typecheck   # 类型检查
pnpm lint        # 代码检查
```

---

## 一、为什么是这个技术栈

需求方明确要求：**后期要支持大量动画**，涉及塔罗牌桌、六爻掷币、蓍草分握、
奇门排盘、大六壬天地盘、星盘连线。

这决定了三件事：

| 决策 | 选型 | 理由 |
|---|---|---|
| **渲染引擎** | **PixiJS 8**（2D 主场景）＋ **react-three-fiber**（3D 场景） | 卡牌/排盘/星盘都是 2D 平面为主，需要大量精灵、粒子、物理手感 → WebGL 2D 比 DOM 快一个数量级；只有真正需要 3D 的（可倾斜星盘、旋转罗盘）才上 R3F |
| **动画编排** | **GSAP** | 时间线能力比 CSS 动画强得多；卡牌洗牌是有先后的复杂序列，必须用时间线编排 |
| **工程底座** | **Vite 7 + React 19 + TypeScript 5.9** | 冷启动快；React 生态与 R3F/Pixi 集成成熟；TS 保证品牌令牌不会写错 |

**为什么不用纯 DOM + CSS 动画**：多张卡牌同屏 + 拖拽 + 粒子时，DOM 会卡。
后期迁移成本远高于一开始就选对。

**为什么不用纯 Three.js**：绝大多数场景是 2D 的（排盘、连线、卡牌），
用 3D 引擎做 2D 事，包体积和开发成本都翻几倍。

---

## 二、目录结构

```
web/
├── index.html                    入口 HTML（含 SEO/OG meta）
├── vite.config.ts                Vite 配置（含别名、分包）
├── public/favicon.svg            品牌符号 favicon
└── src/
    ├── main.tsx                  React 挂载 + 主题预应用
    ├── App.tsx                   路由表
    ├── styles/index.css          ★ 设计令牌（CSS 变量，双主题）
    ├── lib/
    │   ├── brand.ts              品牌常量 + Canvas 用色板
    │   └── motion.ts             动效令牌（缓动/时长/各场景基准时长）
    ├── store/theme.ts            主题状态（zustand + 持久化）
    ├── hooks/useReveal.ts        页面入场动画 + 占位槽呼吸动画
    ├── content/                  ★ 所有对外文案的单一数据源
    │   ├── brand.ts              品牌释义、三才、字源
    │   ├── systems.ts            9 个体系介绍（含三层分组）
    │   └── services.ts           服务档位、流程、边界、FAQ
    ├── components/
    │   ├── sigil/
    │   │   ├── sigil-data.ts     ★ 品牌符号几何（单一数据源）
    │   │   └── NodeSigil.tsx     主视觉符号 SVG
    │   ├── canvas/
    │   │   └── CanvasSlot.tsx    ★ 动画占位槽
    │   └── layout/
    │       ├── SiteChrome.tsx    导航 + 页脚
    │       └── Page.tsx          版式组件（Page/PageHeader/Section/Notice）
    └── pages/                    6 个页面
```

---

## 三、动画占位槽机制（核心设计）

页面里所有动画位置都已经用 `<CanvasSlot>` 占好，**声明了将来要放什么**：

```tsx
<CanvasSlot
  id="tarot-table"                      // ← 与场景注册表的 key 一一对应
  label="牌桌 · 洗牌与抽牌"
  engine="pixi"                         // pixi | r3f
  ratio={16 / 9}
  planned={[
    '洗牌与切牌的手感反馈',
    '牌阵展开与逐张抽牌',
    '翻牌的透视与光泽',
  ]}
/>
```

**将来实现动画时，只需把场景作为 children 传进去，页面结构完全不用改**：

```tsx
<CanvasSlot id="tarot-table" ...>
  <TarotTableScene />
</CanvasSlot>
```

已声明 9 个槽位：

| 槽位 id | 体系 | 引擎 | 将来要做的 |
|---|---|---|---|
| `bazi-pillars` | 八字 | pixi | 四柱干支落位、五行生克、大运流年 |
| `ziwei-palaces` | 紫微斗数 | pixi | 十二宫展开、主星飞入、四化高亮 |
| `astrology-wheel` | 西方占星 | r3f | 星盘连线、行运时间轴 |
| `tarot-table` | 塔罗 | pixi | 洗牌、切牌、抽牌、翻牌 |
| `liuyao-coins` | 六爻 | pixi | 铜钱掷落、爻线生长、蓍草分握 |
| `qimen-board` | 奇门遁甲 | pixi | 九宫排盘、星门神飞入 |
| `daliuren-plate` | 大六壬 | pixi | 天地盘旋转、四课三传 |
| `meihua-trigram` | 梅花易数 | pixi | 数字/时间起卦、上下卦、动爻与变卦 |
| `pendulum-swing` | 灵摆 | pixi | 钟摆振荡与阻尼衰减、灵摆图 |

**三层分组**（`systems.ts` 的 `tier` 字段）：
命理层（需出生信息）／占问层（针对具体一件事）／工具层（靠身体觉察）。

### 落位时请遵守的三条性能约定

1. **可见才初始化**：场景挂载前用 `IntersectionObserver` 判断进入视口，
   否则首屏一次初始化 5 个 WebGL 上下文会直接卡死（浏览器上限约 16 个）。
2. **不可见就暂停**：离开视口后暂停 ticker，不要常驻渲染。
3. **尊重 `prefers-reduced-motion`**：已在 CSS 与 hooks 中统一处理，
   场景内部也要遵守。

---

## 四、双主题系统

一套代码支持两个市场，通过 `data-theme` 切换：

| 主题 | 用途 | 底色 | 强调 |
|---|---|---|---|
| `domestic` | 国内（东方留白） | `#f7f5f2` 宣纸米 | 墨黑 + 暖金 |
| `overseas` | 海外（暗紫星图） | `#111316` 深黑 | 暗紫 + 金 |

- CSS 侧：`src/styles/index.css` 里的 CSS 变量
- Canvas 侧：`src/lib/brand.ts` 里的 `PALETTE`（WebGL 读不到 CSS 变量）
- **改色必须两边同时改**

---

## 五、内容与代码分离

所有对外文字都在 `src/content/` 里，不在组件里硬编码。

原因是**合规要求**：品牌手册规定文案不得出现「改命／转运／化解／开光／加持／
保证／百分百」等词，也不得承诺结果。集中存放便于：
1. 一次审查所有对外表述
2. 非技术同事（运营）能直接改文案
3. 将来接入多语言

**改 `src/content/` 前请逐条自查：不得承诺结果、不得制造恐惧、不得给出医疗／
法律／投资建议、不得使用「改命／转运／化解／开光／加持」等表述。**

---

## 六、已知限制（诚实记录）

1. **未做视觉验证**：本环境无法渲染页面截图，**页面的实际视觉效果尚未逐页确认**。
   请自行打开 `http://127.0.0.1:5175` 检查排版、配色与响应式。
2. **动画全部是占位**：`CanvasSlot` 只显示占位说明，没有任何实际动画。
   PixiJS 与 three 已装好但尚未在组件中引用。
3. **无后端**：所有内容为静态数据。排盘计算后续可接入 `taibu-core`（纯 JS，可全前端运行）。
4. **无 i18n 框架**：英文文案尚未整理，海外主题目前只切换配色。
5. **价格未公开**：刻意的，原因见 `src/content/services.ts` 顶部注释。

---

## 七、下一步建议顺序

1. **先看效果**：打开站点，确认双主题与排版是否符合预期
2. **补视觉规范落位**：品牌主符号已做（`NodeSigil`），还缺封面模板与头像
3. **实现第一个动画场景**：建议从 `tarot-table` 开始（视觉最抓人，最适合获客）
4. **接入排盘引擎**：把 `taibu-core` 接进来，让详情页能真实排盘
5. **整理英文文案**：为海外主题补齐 content/en/

---

## 八、环境要求

- Node `^22.19.0 || >=24`
- pnpm `10` 以上
- `.npmrc` 已放行 `esbuild` 的构建脚本（Vite 的必需依赖）

### 本地开发

```bash
pnpm install
pnpm dev        # http://127.0.0.1:5175
```

### 部署到 GitHub Pages

推送到 `main` 后由 GitHub Actions 自动构建并部署
（工作流：`.github/workflows/deploy.yml`）。

**站点地址**：https://jeremythierrychan.github.io/AboveBelowBetween/

### ⚠️ 首次部署前必须先手动启用 Pages（一次性）

```
仓库 Settings → Pages → Build and deployment → Source → 选「GitHub Actions」
```

**为什么不能自动完成**：创建 Pages 站点需要仓库管理员权限，而 Actions 使用的
`GITHUB_TOKEN` 没有这个权限。实测以下两种自动方式均被拒：

- `actions/configure-pages` 的 `enablement: true`
- 直接调用 `POST /repos/{owner}/{repo}/pages` REST API

启用一次之后，后续每次推送到 `main` 都会自动构建部署，无需再操作。

若首次推送时 Pages 尚未启用，工作流会在 `Setup Pages` 步骤失败。
启用后重新运行一次该工作流即可（Actions → 选择失败的运行 → Re-run all jobs）。

#### 子路径部署的两个关键点

本项目部署在仓库子路径而非域名根目录，有两处必须保持一致：

1. **`vite.config.ts` 的 `base`** 设为 `/AboveBelowBetween/`。
   否则 `index.html` 引用的 `/assets/...` 会指向域名根目录而 404。
2. **`BrowserRouter` 的 `basename`** 从 `import.meta.env.BASE_URL` 读取，
   与上面同源，避免两处各写一遍导致不一致。

#### 深链为什么不会 404

GitHub Pages 是纯静态托管，没有 rewrite 规则。直接访问
`/AboveBelowBetween/systems` 会落到 `404.html`。处理方式：

- 构建时把 `index.html` 复制为 `404.html`（见 `package.json` 的 `build` 脚本）
- `404.html` 的 `<head>` 内联脚本把原始路径转成 `?redirect=` 送回首页
- `src/main.tsx` 在 React 挂载前用 `history.replaceState` 还原真实路径

三处配合才能让深链与刷新都正常。**改动其中任何一处都要同步检查另外两处。**

#### 换自定义域名时

把 `vite.config.ts` 的 `base` 改成 `/`，并在 `public/` 下放入 `CNAME` 文件。
其余逻辑（basename、404 兜底）会自动跟随 `BASE_URL`，无需改动。
