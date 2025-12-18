import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

import noComments from './eslint-rules/no-comments.js';
import uppercaseVariants from './eslint-rules/uppercase-variants.js';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      '.next/',
      'build/',
      'node_modules/',
      '.github/',
      '.vscode/',
      'tailwind.config.ts',
      'next-env.d.ts',
    ],
  },
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'prefer-arrow-callback': 'error',
    },
  },
  {
    files: ['icons/**/*.tsx'],
    plugins: {
      local: {
        rules: {
          'no-comments': noComments,
          'uppercase-variants': uppercaseVariants,
        },
      },
    },
    rules: {
      'local/no-comments': 'error',
      'local/uppercase-variants': 'error',
    },
  },
];

export default config;
