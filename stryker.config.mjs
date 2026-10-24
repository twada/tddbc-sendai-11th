// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  packageManager: "npm",
  // テストファイルごとに node を起動し、node:test の TAP 出力を読み取る
  testRunner: "tap",
  tap: {
    testFiles: ["src/__tests__/**/*.test.ts"],
    // npm test と同じ実行条件(type stripping + power-assert)にそろえる
    nodeArgs: [
      "--enable-source-maps",
      "--disable-warning=ExperimentalWarning",
      "--import",
      "@power-assert/node",
      "--test-reporter=tap",
    ],
  },
  mutate: ["src/**/*.ts", "!src/__tests__/**"],
  coverageAnalysis: "perTest",
  // mutation score が 100% 未満なら失敗させる
  thresholds: { high: 100, low: 100, break: 100 },
  reporters: ["clear-text", "progress", "html"],
  // Stryker は sandbox 内の tsconfig.json を TypeScript の JS API で書き換えようとするが、
  // TypeScript 7 には JS API がないため失敗する。この tsconfig.json には sandbox の外を指す
  // extends / references がなく書き換えは不要なので、存在しないファイルを指定して処理を飛ばす。
  tsconfigFile: "tsconfig.stryker-skip.json",
};
