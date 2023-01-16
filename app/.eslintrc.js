'use strict'
module.exports = {
  extends: 'eslint-config-egg',
  settings: {},
  parserOptions: {
    ecmaVersion: 2018, // 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
    sourceType: 'script', // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
  },
  rules: {
    'arrow-parens': 0, // 箭头函数一个参数
    'array-callback-return': 0, // 数据强制带return
    'no-console': 0,
    'linebreak-style': ['off', 'windows'],
    camelcase: [
      1,
      {
        properties: 'always',
      },
    ],
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none',
      },
    ], // 没用的定义
    'arrow-body-style': [1, 'as-needed', { requireReturnForObjectLiteral: false }], // 在箭头功能体中需要大括号
    'array-bracket-spacing': [2, 'never'],
    semi: 0,
    'comma-dangle': 0,
  },
}
