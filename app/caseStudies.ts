import { type Lang } from './content';

export interface CaseStudyFeature {
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export interface CaseStudyDeepDive {
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}

export interface CaseStudy {
  slug: string;
  title: Record<Lang, string>;
  tagline: Record<Lang, string>;
  image: string;
  github: string;
  demo: string | null;
  meta: {
    period: Record<Lang, string>;
    team: Record<Lang, string>;
    role: Record<Lang, string>;
  };
  stack: string[];
  problem: Record<Lang, string>[];
  features: CaseStudyFeature[];
  flow: Record<Lang, string>;
  deepDives: CaseStudyDeepDive[];
  outcome: Record<Lang, string>[];
}

// ※ 期間・体制・担当・画像は実際の値に更新してください
export const caseStudies: CaseStudy[] = [
  {
    slug: 'city-hall-workflow',
    title: {
      ja: '市役所 申請・承認ワークフローシステム',
      en: 'City Hall Approval Workflow System',
    },
    tagline: {
      ja: '紙で運用されていた庁内の申請・承認業務をWeb化し、年間700時間以上の業務削減を目指すDXプロジェクト。',
      en: 'Digitizing paper-based application & approval workflows at a city hall, targeting 700+ hours of annual time savings.',
    },
    image: '/projects/project1.png',
    github: 'https://github.com/harutocom/city-hall-workflow',
    demo: null,
    meta: {
      period: { ja: '2025年〜 現在', en: '2025 – present' },
      team: { ja: 'チーム開発', en: 'Team project' },
      role: { ja: 'フルスタック開発', en: 'Full-stack development' },
    },
    stack: [
      'Next.js 16 (App Router)', 'React 19', 'TypeScript 5',
      'Neon (Serverless PostgreSQL)', 'Prisma 6', 'NextAuth.js',
      'Zod + React Hook Form', 'Tailwind CSS v4', 'Vercel',
    ],
    problem: [
      {
        ja: '市役所の庁内業務(休暇申請などのワークフロー)はすべて紙で行われており、申請書の作成・回覧・保管に年間700時間以上の削減余地がありました。',
        en: 'Internal workflows at the city hall — leave requests and similar — were entirely paper-based, with an estimated 700+ hours per year spent on writing, routing, and filing forms.',
      },
      {
        ja: '承認者(課長や部長)のデスクには紙の申請書が山積みになり、なかには3年前の申請書が未承認のまま埋もれているケースも。「申請しても承認・処理されない」ことが常態化していました。',
        en: 'Paper forms piled up on approvers\' desks — some requests had sat unapproved for three years. Submitting a request did not mean it would ever be processed.',
      },
      {
        ja: '紙のままでは申請内容や承認履歴を蓄積・分析することもできません。Web化によって業務時間を削減するとともに、将来の勤怠管理・業務分析の基盤をつくることを目指しました。',
        en: 'Paper records also made it impossible to accumulate or analyze application data. The goal was both to cut wasted hours and to build a foundation for future attendance management and process analysis.',
      },
    ],
    features: [
      {
        name: { ja: 'ダッシュボード', en: 'Dashboard' },
        desc: {
          ja: '申請中件数・承認待ち件数・残有給時間をリアルタイムに表示。自分が今なにをすべきかが一目で分かります。',
          en: 'Shows pending applications, items awaiting your approval, and remaining paid leave at a glance.',
        },
      },
      {
        name: { ja: '申請フォーム', en: 'Application Forms' },
        desc: {
          ja: 'テンプレートを選んで入力し、下書き保存または提出。入力チェックは Zod + React Hook Form による型安全なバリデーション。',
          en: 'Pick a template, fill in the form, then save as draft or submit. Validation is type-safe via Zod + React Hook Form.',
        },
      },
      {
        name: { ja: '多段階承認・差し戻し', en: 'Multi-step Approval & Remand' },
        desc: {
          ja: '課長→部長のような多段階承認ルートに対応。コメント付きで差し戻すと申請者が再編集・再提出でき、すべての操作は承認ログに記録されます。',
          en: 'Supports multi-step routes (e.g., section chief → department head). Remands carry comments back to the applicant for resubmission, and every action is logged.',
        },
      },
      {
        name: { ja: 'テンプレートビルダー', en: 'Template Builder' },
        desc: {
          ja: 'パレット・キャンバス・設定の3ペインUIで、申請フォームをノーコードで作成。開発者がいなくても新しい申請書を増やせます。',
          en: 'A three-pane (palette / canvas / settings) no-code builder, so staff can create new application forms without a developer.',
        },
      },
    ],
    flow: {
      ja: `申請者
  └─ 作成 (draft) ─→ 提出 (pending)
        │
        ▼
  承認者 Step 1 ──差し戻し──→ remanded(再編集・再提出)
        │
        ▼
  承認者 Step 2
        │
        ▼
  全ステップ承認完了 → approved
  ※ 有給系テンプレートは最終承認時に残有給を自動減算`,
      en: `Applicant
  └─ create (draft) ─→ submit (pending)
        │
        ▼
  Approver Step 1 ──remand──→ remanded (edit & resubmit)
        │
        ▼
  Approver Step 2
        │
        ▼
  All steps approved → approved
  * Leave templates auto-deduct remaining paid leave on final approval`,
    },
    deepDives: [
      {
        title: { ja: '技術選定の方針', en: 'Tech Decisions' },
        body: {
          ja: '選定基準は「現場の課題を解決するMVPを最速で形にすること」と「モダンなWeb技術を学習・実践すること」の2点。フロントエンドからAPIまでを Next.js(App Router)で完結させ、インフラ構築に時間を使わないよう Neon(Serverless PostgreSQL)+ Prisma を採用しました。認証は NextAuth.js、バリデーションは Zod + React Hook Form と定番に寄せることで、実装スピードとセキュリティを両立しています。',
          en: 'Two criteria drove every choice: ship an MVP that solves the real problem as fast as possible, and learn modern web tech by using it. Next.js (App Router) covers frontend to API in one framework; Neon (serverless PostgreSQL) + Prisma eliminate infrastructure setup. Auth and validation lean on the proven defaults — NextAuth.js and Zod + React Hook Form — balancing speed with security.',
        },
      },
      {
        title: { ja: '多段階承認と差し戻しのモデリング', en: 'Modeling Multi-step Approval & Remand' },
        body: {
          ja: '申請を draft → pending → approved / remanded のステートマシンとして設計し、承認ルートはステップの並びとしてデータベースに保持。各ステップの承認・差し戻しは履歴として記録します。差し戻された申請は申請者が再編集して再提出でき、テンプレートで auto_deduct_leave が有効な場合のみ、最終ステップの承認時に残有給時間を自動計算・減算します。',
          en: 'Applications are a state machine (draft → pending → approved / remanded), with approval routes stored as an ordered sequence of steps and every approve/remand recorded as history. Remanded applications return to the applicant for editing and resubmission. When a template enables auto_deduct_leave, remaining paid leave is recalculated and deducted only on the final approval step.',
        },
      },
      {
        title: { ja: 'ノーコードのテンプレートビルダー', en: 'No-code Template Builder' },
        body: {
          ja: '「開発者がいないと申請書を増やせない」状態を避けるため、総務側が自分でフォームを作れるテンプレートビルダーを実装。パレットからフィールドをキャンバスに配置し、設定パネルで細部を調整する3ペイン構成です。作成したフォーム定義は構造化データとして保存し、申請画面ではその定義から動的にフォームを生成します。',
          en: 'To avoid a future where adding a new form requires a developer, the admin staff can build forms themselves: drag fields from a palette onto a canvas and fine-tune them in a settings panel. Form definitions are stored as structured data, and the application screen renders forms dynamically from those definitions.',
        },
      },
    ],
    outcome: [
      {
        ja: '現在も開発を継続しながら、市役所の担当部署と連携して導入に向けた検証を進めています。導入後は年間700時間以上の業務時間削減を目標としています。',
        en: 'Development is ongoing, and we are working with the city hall to validate the system for rollout. The target is to save 700+ hours of work per year once deployed.',
      },
      {
        ja: '実在する組織の課題をヒアリングから要件に落とし込み、コミット規約・ブランチ戦略などのGit運用ルールを決めてチーム開発する経験を得られました。',
        en: 'The project has been an exercise in turning a real organization\'s pain points into requirements, and in running a team with shared Git conventions for commits and branching.',
      },
    ],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find(c => c.slug === slug);
