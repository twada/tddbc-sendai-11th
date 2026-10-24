# 0012. mutation testing は StrykerJS で行い、mutation score 100% を求める

- ステータス: 承認済み
- 日付: 2026-10-24

## コンテキスト

カバレッジ(ADR 0011)は、コードが実行されたかどうかしか測れない。テストがコードの振る舞いを本当に確かめているかを測るには、コードを少しずつ書き換えた「変異体(mutant)」を作り、テストが失敗する(変異体を検出する)かを調べる mutation testing が有効である。

JavaScript / TypeScript 向けの mutation testing ツールとしては StrykerJS が標準的である。StrykerJS には node:test 専用のテストランナーはないが、TAP 形式の出力を読む tap-runner が使える。node:test は出力先が端末でないとき TAP で出力する。

導入にあたって、次の問題があった。

- StrykerJS は sandbox 内の `tsconfig.json` を書き換えるために TypeScript の JS API(`ts.parseConfigFileTextToJson`)を呼ぶ。TypeScript 7 はネイティブ実装で JS API がないため、ここで失敗する。2026-10-23 公開の 10.1.1 でも同じ処理のままだった。
- 最新の 10.1.1 は導入時点で公開から 1 日しか経っていなかった。

## 決定

- StrykerJS の core と tap-runner を使い、`npm run mutation` で実行する。設定は `stryker.config.mjs` に書く。
- テストファイルの実行条件は `npm test` とそろえる(type stripping、`--import @power-assert/node` など)。
- mutation score が 100% を下回ったら失敗させる(`thresholds.break: 100`)。
- tsconfig の書き換え処理は、存在しないファイルを `tsconfigFile` に指定して飛ばす。この `tsconfig.json` には sandbox の外を指す `extends` / `references` がないので、書き換えは不要である。
- バージョンは公開から日の浅いものを避け、10.0.0 に固定する(`-E`)。
- 生き残った変異体は、まずテストの不足を疑う。どんなテストでも検出できない等価変異体であれば、変異しても検出できる形にコードをリファクタリングする。

## 結果

- 導入時に `points.ts` の `first !== undefined` が等価変異体として生き残った。`length === 1` の下では `first` が `undefined` にならないためである。`[first, ...rest]` に分割する形にリファクタリングし、mutation score は 100% になった。
- tap-runner はテストファイル単位で実行するので、変異体ごとにどのテストケースが検出したかは、ファイル単位でしか分からない。
- `tsconfig.json` に `extends` や `references` を追加したら、tsconfig の書き換えを飛ばす設定を見直す必要がある。StrykerJS が TypeScript 7 に対応したら、この回避策を外す。
- HTML レポートは `reports/mutation/mutation.html` に出力される(git の管理対象外)。
