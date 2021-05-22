module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'max-len': ['warn', { code: 140 }],
    'no-undef': 1,
    'vue/no-unused-components': 1,
    'linebreak-style': 0,
  },
}
