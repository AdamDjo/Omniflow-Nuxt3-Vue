/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    './.eslintrc.nuxt3.json',
    './.eslintrc.modules.json',
    // add more generic rulesets here, such as:
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:cypress/recommended',
    'plugin:vue-scoped-css/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['sonarjs', '@typescript-eslint'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    //'vue/max-attributes-per-line': 'off',
  },
};
