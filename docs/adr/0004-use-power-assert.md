# 0004. アサーションに @power-assert/node を使う

- ステータス: 承認済み
- 日付: 2026-10-24

## コンテキスト

TDD では「テストが失敗したときに、なぜ失敗したかがすぐ分かる」ことが重要。一方で、学習の焦点を API の暗記ではなく振る舞いの記述に置くため、覚えるアサーション API は少ないほうが良い。

`@power-assert/node` は Node のモジュールフックとして動作し、`node:assert` の `assert(式)` が失敗したとき、式の各部分の値を図示する。

## 決定

- アサーションは `node:assert/strict` を使い、`@power-assert/node` を `node --import @power-assert/node` で読み込む。
- テストの基本形は `assert(actual === expected)` とする。オブジェクトや配列の比較など、必要に応じて `assert.deepEqual` なども使ってよい。
- `@power-assert/node` は内部で Node の実験的 API を使うため、実行のたびに `ExperimentalWarning` が出る。テスト出力を読みやすく保つため、テスト実行時に `--disable-warning=ExperimentalWarning` を付ける。
- 失敗時のスタックトレースを `.ts` の行番号で表示するため `--enable-source-maps` を付ける。

## 結果

- `assert(式)` だけで、失敗時に分かりやすいメッセージが得られる。
- `--disable-warning=ExperimentalWarning` は他の実験的機能の警告もまとめて隠す。警告を確認したいときはフラグなしで `node --test` を直接実行する。
