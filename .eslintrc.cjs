module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "cypress/globals": true,
    "jest": true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'node_modules/ts-standard/eslintrc.json',
    "./node_modules/ts-standard/eslintrc.json",
    "plugin:cypress/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "project": "./tsconfig.json"
  },
  plugins: [
    'react-refresh',
    'cypress'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error"
  },
}
