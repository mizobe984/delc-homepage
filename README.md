# delc-homepage

株式会社デルクのコーポレートサイトです。静的サイトとしてビルドし、レンタルサーバー(StarServer)へ FTP でアップロードして公開しています。

- 公開サイト: https://delc.co.jp
- リポジトリのデフォルトブランチ: `feature`

## 技術スタック

- [Astro](https://astro.build/)(静的ビルド。SSR は使用しない)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)(一部 React コンポーネント)
- お知らせ記事は Astro コンテンツコレクション(`src/content/posts/`)で管理
- お問い合わせフォームは EmailJS、求人ページは HERP の外部サービスを利用

## 開発手順

Node.js 20 系を使用します。

| コマンド          | 内容                                   |
| :---------------- | :------------------------------------- |
| `npm install`     | 依存関係のインストール                 |
| `npm run dev`     | 開発サーバーを `localhost:4321` で起動 |
| `npm run build`   | 本番ビルドを `./dist/` に出力          |
| `npm run preview` | ビルド結果をローカルで確認             |
| `npm run lint`    | ESLint によるチェック                  |
| `npm run format`  | Prettier による整形                    |
| `npm run check`   | `astro check`(型・構文チェック)        |

## ディレクトリ構成(抜粋)

```text
/
├── public/            # 最適化不要の静的ファイル(CSS mask 用 SVG など)
├── src/
│   ├── assets/images/ # astro:assets で最適化する画像
│   ├── components/    # Astro / React コンポーネント
│   ├── content/posts/ # お知らせ記事(Markdown)
│   ├── layouts/       # ページレイアウト
│   ├── lib/           # ナビゲーション定義・ユーティリティ
│   ├── pages/         # ルーティング対象のページ
│   ├── scripts/       # クライアントサイド JS
│   └── styles/        # グローバル CSS
└── docs/              # 設計ドキュメント
```

デザイントークン(色・タイポグラフィ・z-index)と CSS の書き方のルールは [docs/design-tokens.md](docs/design-tokens.md) を参照してください。

## デプロイ手順(FTP)

git push では本番に反映されません。公開は以下の手動作業で行います。

1. `npm run build` で `dist/` を生成する
2. FTP クライアント(Cyberduck など)で StarServer に SSL 接続する
3. `dist/` の内容をドキュメントルートへアップロードする

接続情報は StarServer のサーバー管理ツールで確認してください(このリポジトリには置かない)。運用上の内部メモは gitignore 済みの `docs/*.local.md` に置く運用とします。
