# デザイントークン

デザインリニューアルの基盤となるトークン定義と利用ルール(issue #18)。

## カラー

ブランドカラーは **ネイビー(hue 210)**。カラートークンは `src/styles/globals.css` の CSS 変数で定義し、`tailwind.config.js` 経由で `bg-primary` `text-foreground` などのユーティリティとして使う。

| トークン                    | 用途                                       |
| --------------------------- | ------------------------------------------ |
| `primary`                   | ブランドネイビー。ボタン・リンク・強調要素 |
| `secondary`                 | 淡いブルーグレー。ヒーロー背景など面で使う |
| `accent`                    | ホバー背景などの控えめな強調               |
| `muted`                     | 補足テキスト・薄い背景                     |
| `destructive`               | エラー・警告                               |
| `background` / `foreground` | ページ背景 / 基本テキスト                  |

ルール:

- 色は必ずトークン経由で指定する。`#xxx` や `hsl(...)` の直書き、`text-blue-500` などのパレット直接参照は新規コードでは禁止
- hue は 210(ネイビー)系とニュートラルのみ。他の色相を足す場合はトークンとして定義してから使う
- 既存 CSS に残る直書き色は関連 issue(#12 など)で段階的にトークンへ置換する

## タイポグラフィ

フォントスタック(`tailwind.config.js` の `fontFamily`):

- `font-body`(本文・既定): Cabin Variable → Noto Sans JP Variable
- `font-heading`(見出し): Cabin Variable → Noto Sans JP Variable
- `font-sans` / `font-pre`: Open Sans Variable → Noto Sans JP Variable

和文グリフは Noto Sans JP が受け持つ(`@fontsource-variable/noto-sans-jp` を `BaseLayout.astro` で読み込み)。

サイズスケール(`fontSize`):

| クラス           | サイズ / 行間       | 用途                 |
| ---------------- | ------------------- | -------------------- |
| `text-heading-1` | 2.25rem / 1.3       | ページタイトル(h1)   |
| `text-heading-2` | 1.5rem / 1.4        | セクション見出し(h2) |
| `text-heading-3` | 1.25rem / 1.5       | 小見出し(h3)         |
| `text-base`      | 1rem(Tailwind 既定) | 本文                 |
| `text-body-lg`   | 1.125rem / 1.9      | リード文・大きめ本文 |
| `text-caption`   | 0.875rem / 1.6      | 注記・日付・ラベル   |

ルール:

- 見出しには `text-heading-*` を使い、`text-2xl font-bold` のようなアドホックな組み合わせを新規に増やさない
- 本文の行間は和文の可読性を優先して広め(1.7〜1.9)を保つ

## 余白・サイズ

- Tailwind 標準スケール(4px 刻み: `p-4` `gap-6` `mt-12` など)のみを使う
- `h-[32rem]` `-mr-28` `top-24` のような任意値ユーティリティ・マジックナンバーは新規コードでは禁止。やむを得ない場合は理由をコメントで残す
- 既存の任意値はレイアウト刷新系 issue(#19 など)で段階的に標準スケールへ置換する
