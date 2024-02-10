module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'import/no-cycle': 'error',
    'no-unused-vars': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_|^unused$',
        varsIgnorePattern: '^_|^unused$',
      },
    ],
  },
};
