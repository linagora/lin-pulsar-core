import js from '@eslint/js';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import headers from 'eslint-plugin-headers';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import vue from 'eslint-plugin-vue';

export default defineConfigWithVueTs(
  {
    ignores: [
      'dist/',
      'coverage/',
      'eslint.sonarjs.config.js',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  js.configs.recommended,
  vueTsConfigs.recommended,
  vue.configs['flat/recommended'],
  jsdoc.configs['flat/recommended-typescript'],
  prettierSkipFormatting,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'error',
      'vue/require-prop-types': 'error',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/max-attributes-per-line': 'error',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',

      // Import rules
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // JSDoc rules
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionExpression: true,
            MethodDefinition: true,
          },
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSEnumDeclaration',
            'TSPropertySignature',
            'TSModuleDeclaration VariableDeclaration',
            'VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
          ],
        },
      ],
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/require-description': 'warn',
      'jsdoc/require-description-complete-sentence': 'error',

      // General rules
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      curly: 'error',
      'arrow-body-style': ['error', 'as-needed'],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],
    },
  },
  {
    files: ['src/**/*.vue'],
    plugins: {
      headers,
    },
    rules: {
      'headers/header-format': [
        'error',
        {
          source: 'file',
          path: 'COPYRIGHT',
          trailingNewlines: 2,
          enableVueSupport: true,
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,js}'],
    plugins: {
      headers,
    },
    rules: {
      'headers/header-format': [
        'error',
        {
          source: 'file',
          path: 'COPYRIGHT',
          blockPrefix: '\n',
          trailingNewlines: 2,
        },
      ],
    },
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.test.js',
      '**/*.spec.js',
      '**/__tests__/**',
      '**/*.config.*',
    ],
    languageOptions: {
      globals: {
        localStorage: 'readonly',
      },
    },
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'headers/header-format': 'off',
    },
  }
);
