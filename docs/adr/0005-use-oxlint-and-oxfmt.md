# 0005. linter に oxlint、formatter に oxfmt を使う

- ステータス: 承認済み
- 日付: 2026-10-24

## コンテキスト

TDD のリファクタリング段階では、静的解析と自動整形を頻繁に回す。ESLint + Prettier は実績があるが、設定と依存が多い。oxlint / oxfmt は Rust 製で高速、かつ設定が少なくて済む。

## 決定

- linter は oxlint を使う。設定は `.oxlintrc.json`。
  - プラグイン: `typescript`、`unicorn`、`oxc`、`import`、`node`
  - カテゴリ: `correctness` をエラー、`suspicious` を警告
- formatter は oxfmt をデフォルト設定で使う。設定は `.oxfmtrc.json`。
- コマンド: `npm run lint`、`npm run fmt`(整形)、`npm run fmt:check`(差分検出のみ)。

## 結果

- lint / format が一瞬で終わり、サイクルを妨げない。
- ESLint / Prettier のエコシステム(独自ルールやプラグイン)は直接は使えない。ルールが不足したら ADR を追加して見直す。
