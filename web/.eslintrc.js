module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  globals: { process: true, module: true, __isBrowser__: true },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
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
    'object-curly-newline': [
      1,
      {
        ObjectExpression: { consistent: true }, // 对象字面量的配置 关闭
        ObjectPattern: { multiline: true }, // 对象的解构赋值模式的配置
        ImportDeclaration: 'never', // 配置命名的导入
        ExportDeclaration: { multiline: true, minProperties: 3 }, // 配置命名的导出
      },
    ], // 强制在花括号内使用一致的换行符
    'arrow-body-style': 0, // 在箭头功能体中需要大括号
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ], // 等号
    'import/prefer-default-export': 0, // 仅仅导出一个的时候
    'import/no-unresolved': 0,
    'no-undef': 2,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 1,
    'react/jsx-props-no-spreading': 0,
    'jsx-quotes': 0,
    'no-else-return': 0,
    'import/newline-after-import': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
  },
}
