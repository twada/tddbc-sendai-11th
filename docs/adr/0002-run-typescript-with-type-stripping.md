# 0002. TypeScript をコンパイルせず Node の type stripping で直接実行する

- ステータス: 承認済み
- 日付: 2026-10-24

## コンテキスト

TDD のサイクル(Red → Green → Refactor)は短く回せるほど良い。テスト実行の前にトランスパイルやバンドルの工程があると、待ち時間と設定の複雑さが増える。

Node 26 では type stripping(型注釈を取り除いて実行する機能)がフラグなしで使える。ただし対象は「消去可能な構文(erasable syntax)」のみで、Node は `tsconfig.json` を読まない。

代替案:

- `tsc` でビルドしてから `dist/` を実行する — 工程が増え、ソースマップの扱いも必要になる。
- tsx / tsimp などのローダーを使う — 依存が増える。Node 標準機能で足りるなら不要。

## 決定

- `.ts` ファイルを Node でそのまま実行する。ビルド成果物は作らない。
- type stripping と矛盾しないよう、`tsconfig.json` で以下を有効にする。
  - `erasableSyntaxOnly`: `enum`、`namespace`、コンストラクタの parameter properties など、実行時コードを生む TS 固有構文を禁止する。
  - `verbatimModuleSyntax`: 型だけの import は `import type` と書くことを強制する。
  - `allowImportingTsExtensions` + `noEmit`: import パスに `.ts` 拡張子を書く(例: `import { hello } from "../hello.ts"`)。
  - `module: "nodenext"`: Node の ESM 解決規則に合わせる。

## 結果

- テストは `node --test` だけで実行でき、ビルド待ちがない。
- `enum` などの構文は使えない。列挙はユニオン型や `as const` オブジェクトで表現する。
- 型エラーがあってもテストは実行できてしまうため、型検査は別工程で行う(ADR 0006)。
