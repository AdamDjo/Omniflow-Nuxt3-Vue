module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  defaultSeverity: 'warning',
  rules: {
    'color-named': null,
    'color-function-notation': null,
  },
};
