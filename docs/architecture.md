# アーキテクチャ(現状)

このドキュメントは「いま現在どうなっているか」を記述する。各判断の理由は [docs/adr/](adr/) を参照。

## 概要

限定された仕様のモルック(Mölkky)を題材に、TDD を学ぶための演習プロジェクト。現時点では STEP 03(各投てきが終了した時点の得点の推移を確認する)まで実装済み。

## 技術スタック

| 項目               | 採用                                                                | ADR                                                                                                    |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 実行環境           | Node 26(ローカルにインストール済みのもの)                           | —                                                                                                      |
| 言語               | TypeScript 7                                                        | [0002](adr/0002-run-typescript-with-type-stripping.md), [0006](adr/0006-use-tsc-for-typecheck-only.md) |
| 実行方式           | Node の type stripping でコンパイルせず直接実行                     | [0002](adr/0002-run-typescript-with-type-stripping.md)                                                 |
| テストランナー     | `node:test`                                                         | [0003](adr/0003-use-node-test-runner.md)                                                               |
| アサーション       | `node:assert/strict` + `@power-assert/node`                         | [0004](adr/0004-use-power-assert.md)                                                                   |
| linter / formatter | oxlint / oxfmt                                                      | [0005](adr/0005-use-oxlint-and-oxfmt.md)                                                               |
| 型検査             | `tsc`(`noEmit`)                                                     | [0006](adr/0006-use-tsc-for-typecheck-only.md)                                                         |
| カバレッジ         | `node --test` 組み込み(`--experimental-test-coverage`)。100% を要求 | [0011](adr/0011-measure-coverage-with-node-test-runner.md)                                             |
| mutation testing   | StrykerJS 10.0.0 + tap-runner。mutation score 100% を要求           | [0012](adr/0012-mutation-testing-with-stryker.md)                                                      |
| CI                 | GitHub Actions(`.github/workflows/ci.yml`)                          | [0013](adr/0013-run-ci-on-github-actions.md)                                                           |

## ディレクトリ構成

```
.
├── src/                 ソースコード
│   ├── skittle.ts       スキットル(Skittle / SkittleNumber / skittle)
│   ├── points.ts        点数(Points / pointsOf)
│   ├── score.ts         得点(Throw / Score / scoreOf / scoreHistoryOf)
│   └── __tests__/       テストコード(*.test.ts)
│       ├── points.test.ts   点数計算と重複検証のテスト
│       ├── score.test.ts    得点計算のテスト(型レベルテストを含む)
│       └── skittle.test.ts  スキットルの型レベルテスト(番号の範囲、数値との区別)
├── .github/workflows/
│   └── ci.yml           GitHub Actions の CI
├── docs/
│   ├── architecture.md  このファイル
│   ├── adr/             Architecture Decision Records
│   └── problem/         出題者からのお題(原文のまま保存)
├── tsconfig.json        型検査の設定(emit しない)
├── .oxlintrc.json       oxlint の設定
├── .oxfmtrc.json        oxfmt の設定
└── stryker.config.mjs   StrykerJS(mutation testing)の設定
```

## コマンド

| コマンド                | 内容                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `npm test`              | `src/__tests__/**/*.test.ts` を実行                                                                    |
| `npm run test:watch`    | 監視モードでテストを実行                                                                               |
| `npm run test:coverage` | カバレッジ付きでテストを実行。行・分岐・関数のいずれかが 100% 未満なら失敗                             |
| `npm run mutation`      | StrykerJS で mutation testing。score が 100% 未満なら失敗。レポートは `reports/mutation/mutation.html` |
| `npm run typecheck`     | `tsc` で型検査                                                                                         |
| `npm run lint`          | oxlint で静的解析                                                                                      |
| `npm run fmt`           | oxfmt で整形                                                                                           |
| `npm run fmt:check`     | 整形の差分検出のみ                                                                                     |
| `npm run check`         | typecheck → lint → fmt:check → test:coverage を一括実行                                                |

## CI

main への push とすべての PR で、GitHub Actions が typecheck / lint / fmt:check / test:coverage / mutation を順に実行する。mutation testing の HTML レポートは artifact(`mutation-report`)として保存される。

## コードを書くときの制約

- import パスには `.ts` 拡張子を付ける(例: `import { skittle } from "../skittle.ts"`)。
- 型だけの import は `import type` で書く。
- `enum`、`namespace`、コンストラクタの parameter properties など、type stripping で消去できない構文は使わない(`tsc` がエラーにする)。
- アサーションは基本的に `assert(actual === expected)` の形で書く。

## ドメイン

お題は [docs/problem/](problem/) を参照。ドメインは読み取り専用データと純粋関数で表す([ADR 0007](adr/0007-model-domain-with-readonly-data-and-pure-functions.md))。

### 型

| 型              | 定義                                 | 説明                                                                             |
| --------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| `SkittleNumber` | `1 \| 2 \| … \| 12`                  | スキットル番号。範囲外の番号は型エラー。静的に検証できるので実行時の検証はしない |
| `Skittle`       | `{ readonly number: SkittleNumber }` | スキットル。数値として直接扱えないようオブジェクトで包む                         |
| `Points`        | `number`                             | 1 回の投てきで得られる点数                                                       |
| `Throw`         | `readonly Skittle[]`                 | 1 回の投てきで倒したスキットル                                                   |
| `Score`         | `number`                             | チームの得点。投てきの点数の合計                                                 |

### 関数

| 関数                                                            | 説明                                                                                                                                                                                                 |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `skittle(number: SkittleNumber): Skittle`                       | スキットルを作る                                                                                                                                                                                     |
| `pointsOf(...skittles: readonly Skittle[]): Points`             | 1 回の投てきで倒したスキットルから点数を計算する。番号が重複していたら `Error` を投げる                                                                                                              |
| `scoreOf(...throws: readonly Throw[]): Score`                   | 現在の得点を求める。得点の推移の最後の値(投てきが無ければ 0 点)([ADR 0010](adr/0010-compute-score-from-whole-throw-history.md))                                                                      |
| `scoreHistoryOf(...throws: readonly Throw[]): readonly Score[]` | 各投てきが終了した時点の得点を、投てきの順に並べて返す。投てきが無ければ空の配列。点数を積み上げるルールはここだけに置く([ADR 0014](adr/0014-represent-score-history-as-scores-after-each-throw.md)) |

### 実装済みの仕様

- STEP 01-1: スキットルを 1 本倒した場合、そのスキットル番号が点数になる。
- STEP 01-2: スキットルを 2 本以上倒した場合、倒したスキットルの本数が点数になる。1 本も倒さなかった場合は 0 点。
- STEP 02: 得点は 0 点から始まり、複数回の投てきの点数を合計したものが現在の得点になる。
  - 倒れたスキットルは投てきのたびに立て直すので、異なる投てきで同じ番号のスキットルを倒してもよい(重複の検証は 1 回の投てきの中だけ)。
  - 得点に上限はない。
- STEP 03: 各投てきが終了した時点の得点(その時点の得点)を、投てきの順に確認できる。

### 入力の検証

入力の制約は可能な限り静的に検証し、できなければ実行時に検証する([ADR 0009](adr/0009-validate-statically-where-possible-otherwise-at-runtime.md))。

| 制約                                               | 検証方法 | 違反したとき                                                                                                                                             |
| -------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| スキットル番号は 1〜12                             | 型       | 型エラー                                                                                                                                                 |
| 1 回の投てきの中で同じ番号のスキットルは重複しない | 実行時   | `Error`(例: 「スキットル 5 が重複しています」)。最初の重複のみ報告。`scoreOf` / `scoreHistoryOf` でも同じ `Error` になり、途中までの得点や推移は返さない |
| 投てきはスキットルの配列として渡す                 | 型       | 型エラー                                                                                                                                                 |
