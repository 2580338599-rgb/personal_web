// =====================================================================
// 数据文件：替换这里即可更新全站内容
// TODO(reason): 花名、项目、联系方式均为占位，待用户提供真实内容后替换
// =====================================================================
const SITE = {
  name: "Kern",                    // TODO: 替换为你的花名/网名
  role: "AI 应用开发者",
  tagline: "用可运行的项目，证明具体的能力。",
  email: "hello@example.com",      // TODO: 替换为真实邮箱
  github: "https://github.com/",   // TODO: 替换为你的 GitHub
  twitter: "https://twitter.com/"  // TODO: 可选，替换或删除
};

const PROJECTS = [
  {
    slug: "ai-chat-tool",
    title: "AI 对话工具",
    desc: "一个支持多模型切换、本地优先的 AI 对话界面，聚焦隐私与速度。",
    tags: ["React", "TypeScript", "OpenAI API"],
    image: "https://picsum.photos/seed/chat/800/450",
    link: "https://github.com/",
    demo: "#",
    highlights: ["流式输出", "IndexedDB 本地存储", "多模型一键切换"],
    background: "日常高频使用 AI 对话，但市面工具要么太重、要么隐私堪忧，于是自建一个轻量方案。",
    solution: "React + TypeScript 搭建，流式渲染 + IndexedDB 本地存储，零后端部署。"
  },
  {
    slug: "rag-knowledge-base",
    title: "RAG 知识库问答",
    desc: "把私有文档向量化，用检索增强生成做内部知识问答系统。",
    tags: ["Python", "LangChain", "向量数据库"],
    image: "https://picsum.photos/seed/rag/800/450",
    link: "https://github.com/",
    demo: "#",
    highlights: ["文档切片与向量化", "语义检索 + 重排", "引用溯源"],
    background: "团队文档散落在各处，检索效率低，需要一个能引用原文、可溯源的问答入口。",
    solution: "LangChain 编排，向量数据库存储，检索结果带原文引用，回答可验证。"
  },
  {
    slug: "prompt-playground",
    title: "Prompt 调优实验台",
    desc: "一个可对照、可版本化的 prompt 调试工具，帮团队复现与比较提示词效果。",
    tags: ["Next.js", "Tailwind", "PostgreSQL"],
    image: "https://picsum.photos/seed/prompt/800/450",
    link: "https://github.com/",
    demo: "#",
    highlights: ["多 prompt 对照", "版本历史", "结果量化评分"],
    background: "调 prompt 缺少可复现的实验环境，改动无记录、结果难对比。",
    solution: "Next.js 全栈实现，prompt 与结果版本化存储，支持并排对照与评分。"
  }
];

const POSTS = []; // 暂无文章，列表页显示空态

const TIMELINE = [
  { year: "2024", title: "开始专注 AI 应用开发", desc: "把重心从通用开发转向 AI 应用落地。" },
  { year: "2025", title: "独立完成多个 AI 项目", desc: "从对话工具到知识库问答，端到端交付。" },
  { year: "2026", title: "持续输出与沉淀", desc: "开始把踩坑经验整理成文章。" }
];
