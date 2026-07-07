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

## z-index スケール

`src/styles/globals.css` の `:root` に定義したトークンのみを使う。`999` や `9002` のような場当たりな値は追加しない。

| 層                 | 値                      | 用途                          |
| ------------------ | ----------------------- | ----------------------------- |
| ページ内コンテンツ | `z-0`〜`z-50`(Tailwind) | 通常のコンテンツの前後関係    |
| `--z-overlay`      | 60                      | SP メニュー背後のオーバーレイ |
| `--z-nav`          | 70                      | 開いたナビゲーション本体      |
| `--z-nav-block`    | 80                      | PC 固定ナビゲーションバー     |
| `--z-hamburger`    | 90                      | ハンバーガー開閉アイコン      |
| Toaster(shadcn/ui) | 100                     | トースト通知。常に最前面      |

## CSS ファイルの整理方針(issue #12)

現状 `src/styles/` に 13 ファイルあるスタイルは、以下の方針で段階的に削減する。

- **置き場所の原則**
  - サイト全体で共有するもの(トークン・リセット・共通レイアウト)→ `globals.css`
  - 1 コンポーネント / 1 ページ固有のもの → その `.astro` の scoped `<style>` か Tailwind ユーティリティ
  - 新しいグローバル CSS ファイルは追加しない
- **移行タイミング**: ページ固有 CSS(`recruit.css` `contact.css` など)は、そのページに触るレイアウト刷新系 issue(#14〜#17/#19/#20)の中で scoped `<style>` / Tailwind へ移す。CSS 移設だけの独立作業はしない(視覚確認コストが二重になるため)
- **重複の禁止**: ブレークポイント(920px)や色などの値を JS へ複製しない(#13 で JS 側の 920 判定は撤去済み。必要になったら `matchMedia` で CSS と同じクエリ文字列を 1 箇所に定数化する)
