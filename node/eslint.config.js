import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      prettierConfig,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'simple-import-sort/imports': ['error', {
        groups: [
          // 1. Node.js native modules (node: 프로토콜)
          ['^node:'],
          // 2. External modules (npm 패키지)
          ['^@?\\w'],
          // 3. Aliases (@/)
          ['^@/'],
          // 4. Relative imports
          ['^\\.'],
          // 5. Type imports
          ['^.+\\u0000$'],
        ],
      }],
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
  },
])
