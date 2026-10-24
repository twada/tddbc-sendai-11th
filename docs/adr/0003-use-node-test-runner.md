# 0003. テストランナーに Node 組み込みの node:test を使い、テストを src/**tests** に置く

- ステータス: 承認済み
- 日付: 2026-10-24

## コンテキスト

テストランナーの候補には Vitest、Jest、Node 組み込みの `node:test` がある。演習の題材はロジック中心で、DOM やバンドラ連携は不要。依存と設定を最小にし、TypeScript を type stripping で直接実行する方針(ADR 0002)と自然に組み合わせたい。

## 決定

- テストランナーは `node:test`(`describe` / `it`)を使う。
- ソースコードは `src/` に、テストコードは `src/__tests__/` に置き、ファイル名は `*.test.ts` とする。
- テストは `npm test` で実行する。内部では `node --test "src/__tests__/**/*.test.ts"` を呼ぶ。
- 監視モードは `npm run test:watch`(`node --test --watch`)を使う。

## 結果

- テストランナーのための追加依存や設定ファイルが不要。
- Vitest / Jest にあるスナップショットや豊富なマッチャーは使えない。アサーションは ADR 0004 で補う。
