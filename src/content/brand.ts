/**
 * 品牌内容（对外文案的单一数据源）
 * 品牌规范：中文名「星爻间」／英文名「Above · Below · Between」
 * 取名逻辑见本文件底部 englishNames 的注释。
 *
 * ⚠️ 合规约束（不可违反）：
 *   1. 不承诺结果、不承诺准确率
 *   2. 不制造恐惧、不做灾祸营销
 *   3. 不提供医疗、法律、投资建议
 *   4. 不使用「改命／转运／化解／开光／加持／法力」等词
 *   5. 所有服务须标注「文化体验与自我探索」性质
 * 所有对外文案必须满足下列约束，修改前逐条自查。
 */

export const brand = {
  name: '星爻间',
  nameReading: 'xīng yáo jiān',
  /**
   * 英文名（2026-10-04 定稿）
   *
   * 三词对应三才：Above（天）· Below（地）· Between（人 / 间）
   *
   * 为什么不用直译 `Star & Yao`：
   *   1. 三个词都是英文常用词，海外受众零理解门槛
   *   2. `&` 是弱连接词，表达不出「三层」结构；三点分隔符才与中文三才对齐
   *   3. 补回了中文里最关键、也最容易被丢掉的「间」——Between
   *
   * ⚠️ 备选名 `Where Heaven Meets Earth` 已保留，见 englishNames.alt。
   */
  latinName: 'Above · Below · Between',
  /** 主 Tagline */
  tagline: '星在天上，爻在地上，我们在人间。',
  /** 功能性副标 */
  subline: '东西方双体系解读 · 不承诺结果，只给视角与时间窗',
  /** 一行简介（社交平台用） */
  intro: '星爻间 · 东西方双体系解读',
  /** 口头禅 */
  motto: '我先说清楚，我不替你决定。',
  /** 收尾语 */
  closing: '决定权永远在你手上。',
  /** 免责短句 */
  disclaimerShort: '本内容为文化与自我探索分享，仅供参考，不构成任何专业建议。',
  disclaimerFull:
    '本工作室提供的所有服务，属于传统文化体验、自我探索与情绪陪伴性质，不构成任何形式的科学预测、医疗诊断、法律意见或投资建议。我们不承诺任何具体结果。你始终是自己决定的主人。',
} as const

/** 三才结构：名字的来源 */
export const triad = [
  {
    key: 'star',
    glyph: '星',
    realm: '天',
    note: '天上的节律与高度',
    detail: '行星的周期、月相、节气——它们不决定你，但确实构成了你出发时的天气。',
  },
  {
    key: 'yao',
    glyph: '爻',
    realm: '地',
    note: '大地的实情与来处',
    detail: '六爻起于农耕文明，看的是脚下的实情：你手上有多少资源，路上有什么阻碍。',
  },
  {
    key: 'jian',
    glyph: '间',
    realm: '人',
    note: '人所立之处，决定发生的地方',
    detail: '星与爻之间，就是人间。所有真正的决定都发生在这里，也只能由你来做。',
  },
] as const

/** 品牌释义：三个长度 */
export const statement = {
  full: [
    '星在天上。',
    '爻在地上。',
    '人间在它们之间。',
  ],
  fullBody: [
    '星星给的是高度和节律，六爻给的是脚下的实情。两样东西都对，但都不能替你过日子。',
    '所以我们把工作室叫做「间」——不是因为我们站在中间，而是因为决定永远发生在中间。',
    '星告诉你在哪，爻告诉你从哪出发，而「间」是你真正走路的地方。',
  ],
  classical: ['星观其上，爻察其下。', '二者之间，是人所立之处。'],
  classicalSign: ['星在天上，爻在地上，间在人间。'],
  hero: '星在上，爻在下，人在其间。',
} as const

/** 名字的字源依据 */
export const etymology = {
  text: '《说文》：「爻，交也。」',
  note: '「爻」的本义与「交」相关，是天地之气相交的痕迹。所以「间」不是凑上去的第三个字，它和「爻」在字义上是一路的。',
} as const

/**
 * 英文名资产（2026-10-04 定稿）
 *
 * ⚠️ 客户明确要求：备选名必须保留，后续可能改用它。
 * 因此这里同时维护 active / alt 两套，切换时改 `activeEnglish` 一处即可。
 */
export const englishNames = {
  /** 正式英文名 */
  active: 'Above · Below · Between',
  /** 无分隔符写法：用于域名、社交账号 handle、搜索 */
  activePlain: 'Above Below Between',
  /** 连写写法：域名首选（分隔符无法用于域名） */
  activeSlug: 'abovebelowbetween',
  /** 缩写：空间不足时使用 */
  activeAbbr: 'ABB',

  /**
   * 备选英文名 —— 保留待议，不要删除
   *
   * 优点：画面感强、情感共鸣好，海外 spiritual 受众熟悉这类表达
   * 未采用的原因：它是"一句话"而不是名词品牌名；用于域名与商标受限
   * 重估时机：若海外成为主战场，或需要更强的情绪钩子时
   */
  alt: 'Where Heaven Meets Earth',

  /** 英文 tagline（对应中文：星在天上，爻在地上，我们在人间） */
  taglineEn: 'Above the stars, below the lines, between — us.',
  /** 功能性英文副标 */
  sublineEn: 'Tarot · Astrology · Chinese Metaphysics · Readings and tools for self-reflection',
} as const

