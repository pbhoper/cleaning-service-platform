// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
// 1. Import the Prettier plugin and config
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['.history/**'],
  },
  {
    files: ['**/*.{js,ts}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true, // Автоматически находит ближайший tsconfig.json
        tsconfigRootDir: import.meta.dirname, // Указывает на корневую папку проекта
      },
    },
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      // Enforce consistent code formatting using Prettier
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // Code Quality Rules
      curly: 'error',
      'no-await-in-loop': 'off',
      'no-underscore-dangle': 'warn',
      'no-restricted-syntax': ['warn', 'LabeledStatement', 'WithStatement'],
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off',
      'security/detect-object-injection': 'off',

      // TypeScript-Specific Rules
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@/no-throw-literal': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/dot-notation': [
        'error',
        {
          allowIndexSignaturePropertyAccess: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'default',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      'no-console': 'error',
      // Require 'await' in async functions
      'require-await': 'off',
      '@typescript-eslint/require-await': 'warn',

      // Enforce single quotes and allow template literals(should apply rule from .prettierrc)
      quotes: 'off',

      // Disable rules that conflict with Prettier
      '@typescript-eslint/indent': 'off',
      'no-extra-parens': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'typeorm',
              importNames: ['UpdateDateColumn'],
              message: 'Please use UpdatedAtColumn decorator instead for MySQL.',
            },
          ],
        },
      ],

      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'multiline-block-like', next: 'return' },
      ],
    },
  },
  // 3. We pass eslintConfigPrettier as a separate object at the very end of the defineConfig array.
  // This turns off any formatting rules that fight with Prettier.
  eslintConfigPrettier,
);
