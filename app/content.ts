export type Lang = 'ja' | 'en';

interface NavContent {
  about: string; skills: string; works: string; timeline: string; contact: string;
}
interface HeroContent {
  greeting: string; name: string; tagline: string; cta_works: string; cta_contact: string;
}
interface AboutContent {
  title: string; name: string; role: string; university: string; location: string;
  bio: string; motivation: string; hobbies_label: string; hobbies: string[];
}
interface SkillsContent {
  title: string; frontend: string; backend: string; infra: string;
  levels: { high: string; mid: string; low: string };
}
interface WorksContent {
  title: string; detail_btn: string; close_btn: string; github: string; demo: string;
  background_label: string; challenge_label: string; tech_label: string;
}
interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  works: WorksContent;
  timeline: { title: string };
  contact: { title: string; lead: string; body: string };
}

export const content: Record<Lang, SiteContent> = {
  ja: {
    nav: {
      about: 'About',
      skills: 'Skills',
      works: 'Works',
      timeline: 'Timeline',
      contact: 'Contact',
    },
    hero: {
      greeting: 'こんにちは、私は',
      name: '小林 陽翔',
      tagline: 'フロントからバックエンドまで触れるWeb系エンジニア',
      cta_works: '作品を見る',
      cta_contact: '連絡する',
    },
    about: {
      title: 'About',
      name: '小林 陽翔',
      role: '学生エンジニア',
      university: '公立諏訪東京理科大学 工学部 情報応用工学科 3年',
      location: '長野県 茅野市',
      bio: '情報工学を専攻し、WebフルスタックとUI/UXデザインに興味を持つ学生エンジニアです。「引き算の美学」をモットーに、シンプルで使いやすいプロダクトを追求しています。',
      motivation: 'プログラミングを始めたきっかけは、大学1年の頃に友人が作ったWebサービスを見て感動したことです。以来、フロントエンドからバックエンドまで幅広く学んでいます。',
      hobbies_label: '趣味・興味',
      hobbies: ['読書（SF・技術書）', 'コーヒー探求', 'ランニング', 'OSS活動'],
    },
    skills: {
      title: 'Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      infra: 'Infra / Tools',
      levels: { high: '得意', mid: '使える', low: '学習中' },
    },
    works: {
      title: 'Works',
      detail_btn: '詳細',
      close_btn: '閉じる',
      github: 'GitHub',
      demo: 'Demo',
      background_label: '背景・目的',
      challenge_label: '工夫した点',
      tech_label: '技術選定',
    },
    timeline: { title: 'Timeline' },
    contact: {
      title: 'Contact',
      lead: 'お気軽にご連絡ください。',
      body: '新しいプロジェクトのご相談や技術的なお話など、いつでも歓迎しています。',
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      works: 'Works',
      timeline: 'Timeline',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Haruto Kobayashi',
      tagline: 'Full-Stack Web Engineer — from UI to infrastructure.',
      cta_works: 'View Works',
      cta_contact: 'Contact Me',
    },
    about: {
      title: 'About',
      name: 'Haruto Kobayashi',
      role: 'Student Engineer',
      university: 'XX University, Computer Engineering, 3rd Year',
      location: 'Nagano, Japan',
      bio: 'A student engineer majoring in Computer Engineering with a passion for full-stack web development and UI/UX design. I pursue simplicity and function in everything I build.',
      motivation: 'My journey started when I was amazed by what a friend deployed to the internet in my freshman year. Since then I have been exploring the full web stack — frontend to backend.',
      hobbies_label: 'Hobbies & Interests',
      hobbies: ['Reading (Sci-Fi & Tech)', 'Coffee Exploration', 'Running', 'OSS Contribution'],
    },
    skills: {
      title: 'Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      infra: 'Infra / Tools',
      levels: { high: 'Proficient', mid: 'Comfortable', low: 'Learning' },
    },
    works: {
      title: 'Works',
      detail_btn: 'Details',
      close_btn: 'Close',
      github: 'GitHub',
      demo: 'Demo',
      background_label: 'Background',
      challenge_label: 'Challenges',
      tech_label: 'Tech Decisions',
    },
    timeline: { title: 'Timeline' },
    contact: {
      title: 'Contact',
      lead: "Let's create something together.",
      body: 'Open to new projects, technical discussions, or just a friendly chat.',
    },
  },
};

export interface SkillItem {
  name: string;
  level: 1 | 2 | 3;
}

export const skills: Record<'frontend' | 'backend' | 'infra', SkillItem[]> = {
  frontend: [
    { name: 'TypeScript', level: 3 },
    { name: 'React', level: 3 },
    { name: 'Next.js', level: 3 },
    { name: 'HTML / CSS', level: 3 },
    { name: 'Vue.js', level: 2 },
  ],
  backend: [
    { name: 'Python', level: 3 },
    { name: 'FastAPI', level: 2 },
    { name: 'Node.js', level: 2 },
    { name: 'PostgreSQL', level: 2 },
  ],
  infra: [
    { name: 'AWS', level: 2 },
    { name: 'Docker', level: 2 },
    { name: 'Git / GitHub', level: 3 },
    { name: 'Figma', level: 2 },
  ],
};

export interface WorkItem {
  id: number;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  tags: string[];
  image: string;
  github: string;
  demo: string | null;
  background: Record<Lang, string>;
  challenge: Record<Lang, string>;
  tech_reason: Record<Lang, string>;
}

export const worksData: WorkItem[] = [
  {
    id: 1,
    title: { ja: 'タスク管理システム', en: 'Task Manager' },
    desc: {
      ja: 'チームでタスクを共有・管理できるWebアプリ。リアルタイム更新に対応。',
      en: 'A web app for teams to share and manage tasks with real-time sync.',
    },
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    image: '/projects/project1.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    background: {
      ja: 'チームプロジェクトでタスク共有が煩雑だったため、より使いやすいツールを自作しました。',
      en: 'Built to solve inefficiencies in team task sharing during a group project.',
    },
    challenge: {
      ja: 'リアルタイム同期にWebSocketを採用し、接続管理の複雑さと格闘しながら実装しました。',
      en: 'Implementing real-time sync with WebSockets required deep-diving into connection state management.',
    },
    tech_reason: {
      ja: 'Next.jsはSSRとVercelへのデプロイが魅力。PrismaはDB操作を型安全にしてくれました。',
      en: 'Chose Next.js for hybrid SSR/CSR and seamless Vercel deploy. Prisma enabled type-safe DB access.',
    },
  },
  {
    id: 2,
    title: { ja: '気象情報ダッシュボード', en: 'Weather Dashboard' },
    desc: {
      ja: '気象APIと連携し、複雑なデータをシンプルかつ美しく可視化したダッシュボード。',
      en: 'A dashboard that beautifully visualizes complex weather data via public APIs.',
    },
    tags: ['React', 'Python', 'FastAPI', 'Chart.js'],
    image: '/projects/project1.png',
    github: 'https://github.com',
    demo: null,
    background: {
      ja: 'データ可視化の練習として制作。天気APIを活用しグラフ・地図表示を実装しました。',
      en: 'Created as a data visualization exercise using weather APIs with charts and map views.',
    },
    challenge: {
      ja: 'APIのレートリミット対策としてサーバー側にキャッシュ機構を実装しました。',
      en: 'Implemented server-side caching to handle API rate limits effectively.',
    },
    tech_reason: {
      ja: 'バックエンドにFastAPIを採用し、非同期処理による高速なAPIレスポンスを実現しました。',
      en: 'Chose FastAPI for its async capabilities, achieving fast responses for data-heavy endpoints.',
    },
  },
  {
    id: 3,
    title: { ja: 'ポートフォリオサイト', en: 'Portfolio Website' },
    desc: {
      ja: 'このサイト自体。シンプルさと美しさを追求したポートフォリオです。',
      en: 'This very site — a portfolio focused on simplicity and aesthetic detail.',
    },
    tags: ['Next.js', 'TypeScript', 'CSS Modules'],
    image: '/projects/project1.png',
    github: 'https://github.com',
    demo: 'https://example.com',
    background: {
      ja: '自分の作品を見せる場所として、デザインから実装まで一人で制作しました。',
      en: 'Designed and built entirely solo as a showcase for my projects and skills.',
    },
    challenge: {
      ja: 'ダークモード対応・日英切り替えなど、細部のUXにこだわり実装しました。',
      en: 'Focused on UX details including dark mode and seamless JA/EN language switching.',
    },
    tech_reason: {
      ja: 'CSS Modulesでスコープされたスタイルを実現し、グローバルCSSの競合を防ぎました。',
      en: 'Used CSS Modules for scoped styles, eliminating global CSS conflicts.',
    },
  },
];

export interface TimelineItem {
  year: string;
  event: Record<Lang, string>;
  detail: Record<Lang, string | null>;
}

export const timelineData: TimelineItem[] = [
  {
    year: '2021',
    event: { ja: '○○大学 情報工学部 入学', en: 'Entered XX University, Computer Engineering' },
    detail: { ja: null, en: null },
  },
  {
    year: '2022',
    event: { ja: 'プログラミング独学開始（Python・HTML/CSS）', en: 'Started self-study: Python, HTML/CSS' },
    detail: { ja: null, en: null },
  },
  {
    year: '2023',
    event: { ja: '学内ハッカソン参加・優秀賞受賞', en: 'University Hackathon — Excellence Award' },
    detail: {
      ja: 'チーム4人でタスク管理ツールを24時間で開発',
      en: 'Built a task management tool with 4 teammates in 24h',
    },
  },
  {
    year: '2023',
    event: { ja: 'Webフロントエンド インターンシップ（3ヶ月）', en: 'Frontend Internship at startup (3 months)' },
    detail: {
      ja: 'Next.js・TypeScriptを使った業務アプリ開発に従事',
      en: 'Developed business apps with Next.js and TypeScript',
    },
  },
  {
    year: '2024',
    event: { ja: 'バックエンド インターンシップ（継続中）', en: 'Backend Internship (ongoing)' },
    detail: {
      ja: 'PythonとFastAPIを使ったAPI開発を担当',
      en: 'Developing APIs with Python and FastAPI',
    },
  },
  {
    year: '2025',
    event: { ja: '就職活動中', en: 'Currently job hunting' },
    detail: { ja: null, en: null },
  },
];
