# 0013. GitHub Actions で CI を回す

- ステータス: 承認済み
- 日付: 2026-10-24

## コンテキスト

型検査・lint・format チェック・カバレッジ・mutation testing をローカルで実行するだけでは、実行し忘れた変更が main に入りうる。PR の時点で自動的に確かめたい。リポジトリは GitHub にある。

## 決定

- GitHub Actions のワークフロー `.github/workflows/ci.yml` を置く。
- 契機は main への push と、すべての PR(ベースブランチを問わない。積み上げ PR でも回る)とする。
- Node 26 で `npm ci` の後、typecheck / lint / fmt:check / test:coverage / mutation を別々のステップで順に実行する。どのチェックで失敗したかが一目で分かるようにするためである。
- mutation testing は実行時間が短い(導入時点で数秒)ので、毎回実行する。HTML レポートは artifact として保存する。
- 権限は `contents: read` に絞り、checkout では認証情報を残さない(`persist-credentials: false`)。同じブランチで新しい実行が始まったら、古い実行は取り消す。
- Actions はメジャーバージョンのタグで指定する(`actions/checkout@v7` など)。

## 結果

- PR ごとに、ローカルの `npm run check` と `npm run mutation` に相当するチェックが自動で走る。
- mutation testing の実行時間はコードの量とともに伸びる。CI が遅くなってきたら、実行の契機や対象の絞り込みを見直す。
- Actions をタグで指定しているので、タグが付け替えられると意図しないコードが動く可能性がある。必要になったらコミット SHA での固定を検討する。
