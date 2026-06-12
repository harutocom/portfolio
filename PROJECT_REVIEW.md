# プロジェクト評価レポート(再分析)

**対象:** portfolio-lp(Next.js 16 / React 19 ポートフォリオサイト)
**評価日:** 2026-06-12(初回評価と同日、リファクタリング後の再分析)
**評価方法:** 全ソースコードのレビュー + `pnpm build` / `pnpm lint` / `tsc --noEmit` の実行検証 + コンパイル済みCSSの検査

---

## 総合評価: A-(前回 B+ から改善)

前回指摘のコード品質系の問題は全て解消。`pnpm lint` エラー0、`pnpm build` 成功、
`tsc --noEmit` クリーン。構造も667行のモノリスから13コンポーネントに分割され、
保守性が大きく向上した。

ただし再分析で **CSS Modules のスコープ起因の実バグを1件新発見**(下記)。
コンテンツのプレースホルダーは移行作業中のため評価対象外とした。

| カテゴリ | 前回 | 今回 | コメント |
|---|---|---|---|
| アーキテクチャ | A- | A | page.tsx 156行 + components/ 13ファイルに分割 |
| 型安全性 | A | A | tsc クリーン。SiteContent 型の公開で props も型安全 |
| UI/UX実装 | A- | A- | モーダルa11y改善済み。ただしスキルバーのバグ発見(下記) |
| コード衛生 | C | A- | lint エラー0・警告0。残課題はデッドCSSのみ |
| コンテンツ整合性 | D | -(対象外) | 実データ移行中のため今回はノータッチ・未評価 |
| パフォーマンス | B | A | 不要資産3.4MB削除、FA全量読み込み→SVG6個、rAF化 |

---

## 検証結果(実測)

- `pnpm build` … **成功**。全ルート静的生成
- `pnpm lint` … **成功(エラー0・警告0)** ※前回は8エラー/258警告
- `pnpm exec tsc --noEmit` … **クリーン**
- `public/` … 3.8MB → **524KB**(残りは projects/project1.png 等の使用中ファイルのみ)

---

## 🔴 新発見のバグ(→ 修正済み ✅)

### スキルバーのアニメーションが一度も発火していない
[page.module.css:918](app/page.module.css#L918) の

```css
.reveal.visible .skillBar { width: var(--bar-w); ... }
```

は CSS Modules によって `.page-module__E0kJGG__reveal.page-module__E0kJGG__visible ...`
にハッシュ化される(コンパイル済みCSSで確認済み)。しかし実際のDOMに付くのは
**グローバルの** `reveal` / `visible` クラス(globals.css 定義、JSXでは素の文字列、
`classList.add('visible')` も素の文字列)。セレクタが永遠にマッチしないため、
`.skillBar` は初期値の `width: 0` のまま — **Skillsセクションのバーがずっと空**。

**修正済み:** `:global(.reveal.visible) .skillBar { ... }` に変更し、コンパイル後の
セレクタが `.reveal.visible .page-module__xxx__skillBar` となることを確認。

---

## 🟡 残課題(軽微)

1. ~~**デッドCSSが7クラス分残存**~~ → **削除済み ✅**(`.skillLevel` `.dot` `.dotFilled`
   `.skillLegend` `.toggleOpen` `.cardDetail` `.textContent`)
2. **README が create-next-app の雛形のまま** — 使ってもいない Geist フォントの記述が残っている。
   プロジェクト概要・セットアップ手順に書き換えるべき
3. **コンタクトフォームが mailto 方式** — 送信ボタンでメールクライアントが開く設計。
   学生ポートフォリオなら許容範囲だが、Formspree / Resend 等にすると離脱が減る
4. **OG画像が未設定** — `twitter.card: summary_large_image` 指定に対し画像なし
   (実画像が必要なためデータ移行と合わせて対応)

---

## ✅ 前回指摘からの解消済み項目

| 指摘 | 対応 |
|---|---|
| lint 失敗(8エラー/258警告) | 原因の旧テンプレートJS削除で **エラー0・警告0** |
| 旧HTML5UP資産 3.4MB | `public/assets/` `public/images/` 全削除 |
| Font Awesome 全量読み込み | 使用6アイコンのみインラインSVG化([Icons.tsx](app/components/Icons.tsx)) |
| eslint-config-next v15/v16不整合 | 16.2.7 に更新、flat config ネイティブ移行 |
| モーダルに Escape なし | Escape +フォーカストラップ+フォーカス復帰([WorkModal.tsx](app/components/WorkModal.tsx)) |
| `useCountUp` が setInterval | requestAnimationFrame + 経過時間ベースに |
| `<html lang>` が常に ja | 言語切替で同期([page.tsx:42-44](app/page.tsx#L42-L44)) |
| page.tsx 667行 | 156行 + [components/](app/components/) 13ファイル |
| (副産物)effect内setState | `useSyncExternalStore` でテーマ購読に書き換え |

---

## 🟢 リファクタリング後のコードで良い点

- **責務分割が適切** — グローバル状態(lang / theme / modal / scroll)は page.tsx、
  ローカル状態(フィルタ・フォーム)は各コンポーネントに分離
- **テーマ管理が堅牢に** — `data-theme` 属性を single source of truth として
  `useSyncExternalStore` + MutationObserver で購読。React 19 の正攻法
- **新lintルール(react-hooks v6系)を全パス** — `set-state-in-effect` 等の
  最新ルールセットでも警告ゼロ
- **アイコンが依存ゼロに** — 1em ベースのSVGでフォントアイコンと同じ感覚で使える

---

## 推奨アクション(優先度順)

1. ~~スキルバーのセレクタ修正~~ ✅
2. ~~デッドCSS 7クラスの削除~~ ✅
3. README の書き換え
4. (データ移行完了後)プレースホルダー差し替え・OG画像追加 → コンテンツ整合性の再評価
