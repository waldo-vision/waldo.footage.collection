module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    'arrow-parens': ['error', 'as-needed'],
    'no-trailing-spaces': 'error',
    'import/extensions': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        ignoreComments: true,
        ignoreStrings: true,
      },
    ],
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
