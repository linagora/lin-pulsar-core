import sonarjs from 'eslint-plugin-sonarjs';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },
  vueTsConfigs.base,
  {
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
  },
  sonarjs.configs.recommended,
);
