module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    node: true,
    es2020: true
  },
  ignorePatterns: [
    'node_modules',
    'playwright-report',
    'test-results',
    'tests/visual/**-snapshots/**',
    'tests/.auth/**'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
};
