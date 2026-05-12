const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const playwright = require('eslint-plugin-playwright');

module.exports = [
  {
    ignores: ['dist/**', 'playwright-report/**', 'allure-results/**', 'test-results/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright,
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-focused-test': 'error',
    },
  },
];
