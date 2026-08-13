// ==========================================================================
// 个人站交互脚本
// 规范：DESIGN.md · L1.5 —— 仅导航开关 + 数据渲染，无 GSAP、无滚动动画
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 导航（移动端折叠） ---------- */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? 'CLOSE' : 'MENU';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'MENU';
      });
    });
  }

  // 导航滚动态：加细边框 + 半透明底
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  /* ---------- 工具函数 ---------- */
  const tagEl = t => `<span class="tag">${t}</span>`;
  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* ---------- 项目列表（编辑部档案纵向条目） ---------- */
  const projectList = document.querySelector('[data-projects]');
  if (projectList && typeof PROJECTS !== 'undefined') {
    projectList.innerHTML = PROJECTS.map((p, i) => `
      <li>
        <a class="entry" href="project.html?slug=${esc(p.slug)}">
          <div class="entry__head">
            <span class="entry__index">${String(i + 1).padStart(2, '0')}</span>
            <span class="entry__title">${esc(p.title)}</span>
            <span class="entry__arrow">→</span>
          </div>
          <p class="entry__desc">${esc(p.desc)}</p>
          <div class="entry__tags">${p.tags.map(tagEl).join('')}</div>
        </a>
      </li>`).join('');
  }

  /* ---------- 项目详情 ---------- */
  const projectDetail = document.querySelector('[data-project-detail]');
  if (projectDetail && typeof PROJECTS !== 'undefined') {
    const slug = new URLSearchParams(location.search).get('slug');
    const p = PROJECTS.find(x => x.slug === slug);
    if (p) {
      document.title = `${p.title} · ${SITE.name}`;
      projectDetail.innerHTML = `
        <span class="label label--accent">Project · ${esc(p.tags[0]) || ''}</span>
        <h1 class="hero__title" style="font-size:clamp(1.9rem,4vw,2.75rem);">${esc(p.title)}</h1>
        <p class="hero__subtitle">${esc(p.desc)}</p>
        <div class="hero__actions" style="margin-bottom:var(--space-7);">
          <a class="btn btn-primary" href="${esc(p.link)}" target="_blank" rel="noopener">查看源码 ↗</a>
          <a class="btn btn-secondary" href="${esc(p.demo)}" target="_blank" rel="noopener">在线演示</a>
        </div>
        <ul class="tag-list" style="margin-bottom:var(--space-7);">${p.tags.map(tagEl).join('')}</ul>
        <img src="${esc(p.image)}" alt="${esc(p.title)}" style="border:1px solid var(--border); margin-bottom:var(--space-8);">
        <h2 class="section-title">背景与问题</h2>
        <div class="prose"><p>${esc(p.background)}</p></div>
        <h2 class="section-title">我的方案</h2>
        <div class="prose"><p>${esc(p.solution)}</p></div>
        <h2 class="section-title">成果亮点</h2>
        <ul class="prose">${p.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>`;
    } else {
      projectDetail.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__title">项目不存在</div>
          <p>没有找到这个项目，<a class="text-link" href="projects.html">返回项目列表</a></p>
        </div>`;
    }
  }

  /* ---------- 文章列表 ---------- */
  const postList = document.querySelector('[data-posts]');
  if (postList) {
    if (typeof POSTS === 'undefined' || POSTS.length === 0) {
      postList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__title">文章正在路上</div>
          <p>第一批内容还在整理。在那之前，可以先看看<a class="text-link" href="projects.html">我的项目</a>，或发邮件和我聊聊。</p>
        </div>`;
    } else {
      postList.innerHTML = `<ul class="entry-list">${POSTS.map((p, i) => `
        <li>
          <a class="entry" href="post.html?slug=${esc(p.slug)}">
            <div class="entry__head">
              <span class="entry__index">${String(i + 1).padStart(2, '0')}</span>
              <span class="entry__title">${esc(p.title)}</span>
              <span class="entry__arrow">→</span>
            </div>
            <p class="entry__desc">${esc(p.date)}</p>
            <div class="entry__tags">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          </a>
        </li>`).join('')}</ul>`;
    }
  }

  /* ---------- 文章详情 ---------- */
  const postDetail = document.querySelector('[data-post-detail]');
  if (postDetail) {
    const slug = new URLSearchParams(location.search).get('slug');
    const p = (typeof POSTS !== 'undefined' ? POSTS : []).find(x => x.slug === slug);
    if (p) {
      document.title = `${p.title} · ${SITE.name}`;
      postDetail.innerHTML = `
        <span class="label label--accent">Essay · ${esc(p.date)}</span>
        <h1 class="hero__title" style="font-size:clamp(1.9rem,4vw,2.5rem);">${esc(p.title)}</h1>
        <div class="prose">${p.content}</div>`;
    } else {
      postDetail.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__title">文章不存在</div>
          <p><a class="text-link" href="writing.html">返回文章列表</a></p>
        </div>`;
    }
  }

  /* ---------- 时间线（关于页） ---------- */
  const timeline = document.querySelector('[data-timeline]');
  if (timeline && typeof TIMELINE !== 'undefined') {
    timeline.innerHTML = TIMELINE.map(t => `
      <li class="timeline__item">
        <div class="timeline__year">${esc(t.year)}</div>
        <div class="timeline__title">${esc(t.title)}</div>
        <div class="timeline__desc">${esc(t.desc)}</div>
      </li>`).join('');
  }
});
