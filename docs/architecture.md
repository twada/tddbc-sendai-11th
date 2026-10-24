# アーキテクチャ(現状)

このドキュメントは「いま現在どうなっているか」を記述する。各判断の理由は [docs/adr/](adr/) を参照。

## 概要

限定された仕様のモルック(Mölkky)を題材に、TDD を学ぶための演習プロジェクト。現時点では STEP 01-1(スキットルを 1 本倒した場合の点数)まで実装済み。

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
│   ├── skittle.ts       スキットル(Skittle / SkittleNumber / skittle)
│   ├── points.ts        点数(Points / pointsOf)
│   └── __tests__/       テストコード(*.test.ts)
│       ├── points.test.ts   点数計算のテスト
│       └── skittle.test.ts  スキットル番号の範囲の型レベルテスト
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

- import パスには `.ts` 拡張子を付ける(例: `import { skittle } from "../skittle.ts"`)。
- 型だけの import は `import type` で書く。
- `enum`、`namespace`、コンストラクタの parameter properties など、type stripping で消去できない構文は使わない(`tsc` がエラーにする)。
- アサーションは基本的に `assert(actual === expected)` の形で書く。

## ドメイン

お題は [docs/problem/](problem/) を参照。ドメインは読み取り専用データと純粋関数で表す([ADR 0007](adr/0007-model-domain-with-readonly-data-and-pure-functions.md))。

### 型

| 型              | 定義                                 | 説明                                                                                                                         |
| --------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `SkittleNumber` | `1 \| 2 \| … \| 12`                  | スキットル番号。範囲外の番号は型エラー([ADR 0008](adr/0008-guarantee-skittle-number-range-by-type.md))。実行時の検証はしない |
| `Skittle`       | `{ readonly number: SkittleNumber }` | スキットル。数値として直接扱えないようオブジェクトで包む                                                                     |
| `Points`        | `number`                             | 1 回の投てきで得られる点数                                                                                                   |

### 関数

| 関数                                      | 説明                                       |
| ----------------------------------------- | ------------------------------------------ |
| `skittle(number: SkittleNumber): Skittle` | スキットルを作る                           |
| `pointsOf(skittle: Skittle): Points`      | 1 本倒したとき、スキットル番号を点数とする |

### 実装済みの仕様

- STEP 01-1: スキットルを 1 本倒した場合、そのスキットル番号が点数になる。
