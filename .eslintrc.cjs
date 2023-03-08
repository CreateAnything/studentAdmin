module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  // 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  //// 支持ts的最新语法
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  //添加vue和@typescript-eslint插件，增强eslint的能力
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-var': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
