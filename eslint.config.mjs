import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    env: {
      node: true,
      commonjs: true,
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { ...globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/node_modules/', '**/dist/'],
  },
]
