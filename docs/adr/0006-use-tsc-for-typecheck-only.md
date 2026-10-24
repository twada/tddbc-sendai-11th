# 0006. tsc (TypeScript 7) は型検査専用とする

- ステータス: 承認済み
- 日付: 2026-10-24

## コンテキスト

ADR 0002 により、実行時に型は検査されない。型の誤りを検出する工程が別途必要。TypeScript 7 はネイティブ実装の `tsc` で、型検査が高速。

## 決定

- TypeScript 7 の `tsc` を型検査のみに使い、`noEmit: true` で JavaScript は出力しない。
- `npm run typecheck` で `src/` 以下(テストを含む)を検査する。
- 型検査は厳しめに設定する: `strict`、`noUncheckedIndexedAccess`、`exactOptionalPropertyTypes`、`noImplicitReturns`、`noImplicitOverride`、`noFallthroughCasesInSwitch`。
- Node の型定義は `@types/node` を使い、`types: ["node"]` で明示的に読み込む。
- `npm run check` で typecheck → lint → fmt:check → test をまとめて実行できるようにする。

## 結果

- 実行(type stripping)と型検査(tsc)の役割がはっきり分かれる。
- `npm test` が通っても型エラーが残っている場合があるため、コミット前には `npm run check` を実行する。
