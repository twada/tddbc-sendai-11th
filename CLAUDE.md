# CLAUDE.md

## 開発の進め方

- 開発は Red/Green TDD で進める。
  - Red: まず失敗するテストを 1 つ書き、`npm test` で期待どおりに失敗することを確認する。
  - Green: そのテストを通す最小限のコードを書き、`npm test` が通ることを確認する。
  - テストが通っている状態を保ったまま、必要に応じてリファクタリングする。

## コミット規約

- コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) に従う(`feat:`、`fix:`、`test:`、`refactor:`、`docs:`、`chore:` など)。
- コミットメッセージ(要約・本文とも)は日本語で書く。
- 未コミットの変更は、意味のある内容ごとに分けて複数のコミットにする。
