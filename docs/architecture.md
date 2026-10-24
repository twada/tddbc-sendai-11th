# アーキテクチャ(現状)

このドキュメントは「いま現在どうなっているか」を記述する。各判断の理由は [docs/adr/](adr/) を参照。

## 概要

限定された仕様のモルック(Mölkky)を題材に、TDD を学ぶための演習プロジェクト。現時点では環境整備のみが完了しており、ドメインのコードはまだない。

## 技術スタック

| 項目               | 採用                                            | ADR                                                                                                    |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 実行環境           | Node 26(ローカルにインストール済みのもの)       | —                                                                                                      |
| 言語               | TypeScript 7                                    | [0002](adr/0002-run-typescript-with-type-stripping.md), [0006](adr/0006-use-tsc-for-typecheck-only.md) |
| 実行方式           | Node の type stripping でコンパイルせず直接実行 | [0002](adr/0002-run-typescript-with-type-stripping.md)                                                 |
| テストランナー     | `node:test`                                     | [0003](adr/0003-use-node-test-runner.md)                                                               |
| アサーション       | `node:assert/strict` + `@power-assert/node`     | [0004](adr/0004-use-power-assert.md)                                                                   |
| linter / formatter | oxlint / oxfmt                                  | [0005](adr/0005-use-oxlint-and-oxfmt.md)                                                               |
| 型検査             | `tsc`(`noEmit`)                                 | [0006](adr/0006-use-tsc-for-typecheck-only.md)                                                         |

## ディレクトリ構成

```
.
├── src/                 ソースコード
│   ├── hello.ts         環境確認用のダミー(演習開始時に削除)
│   └── __tests__/       テストコード(*.test.ts)
│       └── hello.test.ts
├── docs/
│   ├── architecture.md  このファイル
│   ├── adr/             Architecture Decision Records
│   └── problem/         出題者からのお題(原文のまま保存)
├── tsconfig.json        型検査の設定(emit しない)
├── .oxlintrc.json       oxlint の設定
└── .oxfmtrc.json        oxfmt の設定
```

## コマンド

| コマンド             | 内容                                           |
| -------------------- | ---------------------------------------------- |
| `npm test`           | `src/__tests__/**/*.test.ts` を実行            |
| `npm run test:watch` | 監視モードでテストを実行                       |
| `npm run typecheck`  | `tsc` で型検査                                 |
| `npm run lint`       | oxlint で静的解析                              |
| `npm run fmt`        | oxfmt で整形                                   |
| `npm run fmt:check`  | 整形の差分検出のみ                             |
| `npm run check`      | typecheck → lint → fmt:check → test を一括実行 |

## コードを書くときの制約

- import パスには `.ts` 拡張子を付ける(例: `import { hello } from "../hello.ts"`)。
- 型だけの import は `import type` で書く。
- `enum`、`namespace`、コンストラクタの parameter properties など、type stripping で消去できない構文は使わない(`tsc` がエラーにする)。
- アサーションは基本的に `assert(actual === expected)` の形で書く。

## ドメイン

未着手。モルックの限定仕様と設計は演習の進行に合わせてここに追記する。
