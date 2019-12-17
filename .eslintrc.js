module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ],
    'standard/no-callback-literal': 'off',
    'standard/computed-property-even-spacing': 'off',
    yoda: 'off',
    'import/first': 'off',
    'import/no-webpack-loader-syntax': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'no-useless-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    'no-dupe-class-members': 'off',
    'prefer-promise-reject-errors': 'off'
  }
}
