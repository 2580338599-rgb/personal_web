# DESIGN.md

> 一句话设计宣言：把「AI 项目、文章、履历」当成一份编辑部档案来排版——黑白灰 + 单一朱红，靠字体与留白建立层级，像真实设计作品，不像生成式模板。

## 1. Visual Theme & Atmosphere

**Style**: Editorial Archive（编辑部档案）
**Keywords**: 编辑感、档案、黑白灰、克制、留白、报纸、元数据、耐看
**Tone**: 克制、现代、专业、有作品感 — NOT 霓虹、NOT 渐变、NOT 大圆角模板、NOT 炫技
**Feel**: 像翻开一份排版精良的行业刊物，内容自己说话，装饰退后。

**Interaction Tier**: L1.5（首页首屏一个克制入场，其余全静态）
**Dependencies**: CSS only（不引入 GSAP / ScrollTrigger / WebGL / Lenis）

> 参考 greymac.com 的视觉 DNA：元数据式排版（`CLIENT : AUDI / YEAR : 2022`）、全大写小字号标签、单列窄容器、黑白灰 + 单一强调色、几乎零动效。方向 A 把它抽象为通用设计语言，套到「AI 应用开发者」的身份上。

---

## 2. Color Palette & Roles

**亮色（默认）**

```css
:root {
  /* Backgrounds */
  --bg: #FAFAF8;                          /* 主背景：暖米白 */
  --surface: #FFFFFF;                     /* 卡片/表面：纯白 */
  --surface-alt: #F3F2EE;                 /* 交替 section：浅暖灰 */

  /* Borders */
  --border: #E5E3DD;                      /* 默认细边框 */
  --border-hover: #C9C6BE;                /* 悬停边框 */

  /* Text */
  --text: #141414;                        /* 主文字：墨黑 */
  --text-secondary: #5C5A55;              /* 正文、描述 */
  --text-tertiary: #8A8780;               /* 元数据、辅助 */

  /* Accent — 单一朱红，唯一强调色 */
  --accent: #D6452F;                      /* 链接、悬停、小圆点、CTA */
  --accent-hover: #B83A26;

  /* RGB variants */
  --text-rgb: 20, 20, 20;
  --accent-rgb: 214, 69, 47;

  /* Semantic */
  --success: #2E7D4F;
  --error: #C0392B;
  --warning: #B97A1A;
}
```

**Color Rules:**
- 全站只有**一个强调色（朱红）**，其余全部黑白灰。禁止出现第二个彩色。
- 所有颜色通过 CSS 变量引用，禁止硬编码 hex（RGB 辅助值除外）。
- 层级靠「黑白灰阶 + 留白」建立，不靠彩色背景块。
- 对比度：正文 `--text-secondary` 对 `--bg` ≥ 4.5:1，标题 `--text` 对 `--bg` ≥ 7:1。
- 朱红只用于「链接、悬停态、小圆点、CTA 文字下划线」，绝不用于大面积底色。

---

## 3. Typography Rules

**Font Stack:**

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=Noto+Serif+SC:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

--font-display: 'Fraunces', 'Noto Serif SC', serif;  /* 大标题：衬线 */
--font-heading: 'Noto Serif SC', 'Fraunces', serif;  /* 章节标题 */
--font-body: 'Noto Sans SC', 'Inter', sans-serif;    /* 正文 */
--font-mono: 'JetBrains Mono', monospace;            /* 元数据、代码 */
```

| Role | Font | Size | Weight | Line Height | Letter Spacing | Case |
|------|------|------|--------|-------------|----------------|------|
| Display H1 | Fraunces / Noto Serif SC | clamp(2.5rem, 6vw, 4rem) | 600 | 1.15 | -0.01em | — |
| Section H2 | Noto Serif SC | clamp(1.75rem, 3vw, 2.5rem) | 600 | 1.25 | 0 | — |
| H3 | Noto Sans SC | 1.125rem | 600 | 1.4 | 0 | — |
| Body | Noto Sans SC | 16px | 400 | 1.8 | 0.02em | — |
| Lead（引言） | Noto Serif SC | 1.25rem | 500 | 1.6 | 0 | — |
| Label / 元数据 | JetBrains Mono | 12px | 500 | 1.5 | 0.08em | UPPERCASE |

**Typography Rules:**
- 标题用衬线（中文思源宋体、英文 Fraunces），正文用无衬线，形成「编辑刊物」的经典对比。
- 中文正文字号 ≥ 16px，行高 ≥ 1.7，字距 0.02em。
- **元数据一律 JetBrains Mono 全大写小字号**（如 `AI APPLICATION DEVELOPER`、`CLIENT : XXX`），这是编辑部档案的签名手法。
- **NEVER use**: 霓虹色标题、渐变文字、投影文字、Comic Sans、Arial。

**Text Decoration:**
- 标题：无渐变、无投影，纯色（墨黑）。靠字号、字重、衬线建立层级。
- 强调词：用 `<em>` 斜体（衬线斜体）或朱红点缀，不用高亮块。

---

## 4. 间距系统（Spacing System）

以 8px 为基准的等差刻度：

| Token | 值 | 用途 |
|-------|-----|------|
| `--space-1` | 4px | 图标与文字间 |
| `--space-2` | 8px | tag 内边距、紧邻元素 |
| `--space-3` | 12px | 卡片内小间距 |
| `--space-4` | 16px | 列表项间距 |
| `--space-5` | 24px | 卡片内边距、段落间 |
| `--space-6` | 32px | 组件间 |
| `--space-7` | 48px | section 内分组 |
| `--space-8` | 64px | 移动端 section 间距 |
| `--space-9` | 96px | 桌面端 section 间距 |
| `--space-10` | 128px | 首页大块留白 |

```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-5: 24px; --space-6: 32px;
  --space-7: 48px; --space-8: 64px; --space-9: 96px;
  --space-10: 128px;
  --section-pad: 96px;
}
```

**容器宽度：**
- 内容容器（正文、文章、关于）：**720px**（窄容器，编辑感核心）
- 列表容器（项目列表、首页）：**900px**
- 全宽导航/页脚内边距：24px（移动）/ 48px（桌面）

---

## 5. Navigation 规范

```
┌────────────────────────────────────────────────┐
│ GRAHAM · AI DEV        WORK  WRITING  ABOUT  CONTACT │
└────────────────────────────────────────────────┘
```

- **左**：站名/花名，衬线体，字号 1.125rem，无图标。
- **右**：导航项全大写 mono 小字（12px，letter-spacing 0.08em），如 `WORK` `WRITING` `ABOUT` `CONTACT`。
- **当前页**：加朱红下划线（或朱红文字）。
- **hover**：下划线从 0 宽度滑入（`background-size` 过渡），不改变颜色。
- **滚动后**：顶部加 1px 细边框 + 半透明米白底（`rgba(250,250,248,.9)`），无模糊。
- 移动端：折叠为左上「MENU」按钮，展开纵向全大写列表。

```css
.nav {
  position: sticky; top: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px;
  background: transparent;
  border-bottom: 1px solid transparent;
}
.nav.scrolled { background: rgba(250,250,248,.9); border-bottom-color: var(--border); }
.nav__link {
  font-family: var(--font-mono); font-size: 12px;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-secondary); text-decoration: none;
}
.nav__link:hover { color: var(--text); }
.nav__link[aria-current="page"] { color: var(--accent); }
```

---

## 6. Button 规范

克制——以「文字 + 下划线」为主，拒绝大圆角实底块。

```css
.btn {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: .06em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border-radius: 0;              /* 直角，编辑部档案 */
  padding: 8px 0;                /* 以下划线为视觉主体 */
  border-bottom: 1px solid currentColor;
  transition: color .2s ease, border-color .2s ease;
}

/* 主 CTA：朱红 */
.btn-primary {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
.btn-primary:hover { color: var(--accent-hover); border-bottom-color: var(--accent-hover); }

/* 次 CTA：墨黑 */
.btn-secondary {
  color: var(--text);
  border-bottom-color: var(--text);
}
.btn-secondary:hover { color: var(--text-secondary); border-bottom-color: var(--text-secondary); }

.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
```

**规则：**
- 按钮一律直角、下划线式，不使用填充实底块、不使用大圆角。
- 全大写 mono 小字，字号 13px，letter-spacing 0.06em。
- 唯一例外：表单提交按钮可用朱红细边框 + 透明底（见「表单与 CTA」）。

---

## 7. Card 规范

编辑感卡片：细边框 + 白底 + 直角/极小球角，无大阴影。

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 2px;             /* 几乎直角 */
  padding: var(--space-5);
  transition: border-color .2s ease;
}
.card:hover { border-color: var(--border-hover); }

/* 项目/文章条目：横向列表，非网格瀑布 */
.entry {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-5);
  align-items: baseline;
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--border);
}
.entry__index { font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); }
.entry__title { font-family: var(--font-heading); font-size: 1.25rem; }
.entry__meta { font-family: var(--font-mono); font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; }
.entry:hover .entry__title { color: var(--accent); }
```

**规则：**
- 项目/文章用**纵向列表条目**（序号 + 标题 + 元数据），不用等大卡片瀑布——这是编辑部档案的关键差异。
- 条目之间用 1px 底边框分隔，无阴影、无悬浮抬升。
- 若确实需要图片，用细边框图片 + 标题，hover 仅标题变朱红、图片 scale 1.02。

---

## 8. Tag / Badge 规范

```css
.tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 0;
  padding: 4px 8px;
  background: transparent;
}
.tag:hover { color: var(--accent); border-color: var(--accent); }
```

**规则：**
- 全大写 mono 小字，细边框、直角、透明底。
- 不用彩色底、不用圆角胶囊——避免模板感。

---

## 9. Form 与 CTA 规范

```css
.form__input, .form__textarea {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--text);
  transition: border-color .2s ease;
}
.form__input:focus, .form__textarea:focus {
  outline: none;
  border-color: var(--accent);       /* 聚焦变朱红 */
}
.form__submit {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--accent);
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: 0;
  padding: 12px 24px;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.form__submit:hover { background: var(--accent); color: #fff; }
```

**CTA 原则：**
- 首页联系 CTA 用一句真诚的话 + 邮箱链接（朱红下划线），不用「立即注册」式按钮话术。
- 表单提交按钮是唯一允许「朱红细边框」的地方，hover 才填朱红。

---

## 10. 暗黑模式规则

默认亮色，通过 CSS 变量支持暗黑模式（跟随系统 `prefers-color-scheme`，或手动 `data-theme`）。

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0E0E10;
    --surface: #17171A;
    --surface-alt: #1D1D21;
    --border: #2A2A2F;
    --border-hover: #3A3A40;
    --text: #F5F5F0;
    --text-secondary: #A8A6A0;
    --text-tertiary: #6E6C66;
    --accent: #E85B44;               /* 暗底上略提亮的朱红，保持可读 */
    --accent-hover: #F0735E;
  }
}
```

**规则：**
- 暗黑模式仍保持「黑白灰 + 单一朱红」，不引入霓虹。
- 朱红在暗底上提亮一档（`#E85B44`）保证对比度 ≥ 4.5:1。
- 元数据、下划线、边框全部沿用变量，自动适配。

---

## 11. Responsive 规则

| Name | Width | 关键变化 |
|------|-------|---------|
| Desktop | > 1024px | 容器 720/900px，导航水平，条目三列（序号/标题/元数据） |
| Tablet | 768–1024px | 容器自适应，条目仍横向 |
| Mobile | < 768px | 单列，导航折叠为 MENU，条目改为「标题 + 元数据」两行堆叠 |

```css
@media (max-width: 768px) {
  :root { --section-pad: 64px; }
  .nav { padding: 16px 24px; }
  .entry { grid-template-columns: 1fr; gap: 8px; }
  .entry__index { display: none; }   /* 移动端隐藏序号，省空间 */
}
```

**规则：**
- 移动端触摸目标 ≥ 44×44px。
- 移动端条目序号可隐藏，标题 + 元数据两行堆叠。
- 无横向溢出。

---

## 12. 动效原则（L1.5）

**Motion Philosophy**: 几乎不动——只保留首页首屏一个克制的入场，其余全靠「下划线滑入、颜色过渡、图片 scale」这些微反馈。

**L1.5 定义：**
- **唯一入场动画**：首页 Hero 的标题 + 副标题做一次「淡入 + 上移 8px」（0.5s ease-out，stagger 0.1s）。仅加载时执行一次。
- **其余全部静态**：无滚动 reveal、无 pin、无 scroll 叙事、无视差。
- **hover 微反馈**：下划线滑入、颜色过渡、图片 scale 1.02——这些都是 CSS transition，不算动效动画。

```css
/* 唯一入场（首页 Hero） */
@keyframes rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero__title { animation: rise-in .5s ease-out both; }
.hero__subtitle { animation: rise-in .5s ease-out .1s both; }

/* 其余全静态，只用 transition */
a, .btn, .entry__title, .tag { transition: color .2s ease, border-color .2s ease; }
.entry img { transition: transform .3s ease; }
```

**硬性约束：**
- ❌ 不引入 GSAP / ScrollTrigger / WebGL / Lenis / Three.js。
- ❌ 无滚动 reveal、无 pin、无 scroll 叙事、无视差。
- ❌ 无 `backdrop-filter`、无 `filter: blur()`。
- ✅ 遵守 `prefers-reduced-motion`：检测到即关闭入场动画。

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```
