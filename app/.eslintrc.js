module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'max-len': ['error', {
      code: 120,
      tabWidth: 4,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    camelcase: ['error'],
    // 'id-match': ['error', '^[a-z]+([A-Z][a-z]+)*$'],
    'padding-line-between-statements': ['error',
      {blankLine: 'always', prev: '*', next: 'return'},
      {blankLine: 'always', prev: 'block', next: '*'},
      {blankLine: 'always', prev: 'block-like', next: '*'},
    ],
    'newline-per-chained-call':
            ['error', { 'ignoreChainWithDepth': 1 }],
    indent: ['error', 2],
    'no-console': 2,
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'no-multiple-empty-lines': ['error'],
    quotes: ['error', 'single'],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  }
}