// @ts-check
// Nuxt's ESLint module generates a flat config auto-tuned for this project
// (TypeScript, Vue, stylistic rules from nuxt.config.ts). We layer
// eslint-config-prettier on top so Prettier owns formatting and ESLint avoids
// stylistic conflicts.
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

export default withNuxt(prettier, {
  rules: {
    // Project-specific overrides go here.
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
  },
})
