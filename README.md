# tddbc-sendai-11th

限定された仕様のモルック(Mölkky)を題材にした TDD 演習用リポジトリ。

## 必要なもの

- Node 26

## セットアップ

```sh
npm install
```

## よく使うコマンド

```sh
npm test               # テスト実行
npm run test:watch     # 監視モード
npm run test:coverage  # カバレッジ付きでテスト実行(100% 未満で失敗)
npm run mutation       # mutation testing(score 100% 未満で失敗)
npm run check          # 型検査 + lint + format チェック + カバレッジ付きテスト
```

構成と設計判断は [docs/architecture.md](docs/architecture.md) と [docs/adr/](docs/adr/) を参照。
