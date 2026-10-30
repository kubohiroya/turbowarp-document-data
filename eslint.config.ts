import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/source-document/**/*.js', 'tests/fixtures/legacy-embedded-yaml/**/*.js'],
    languageOptions: {globals: {TextEncoder: 'readonly', URL: 'readonly'}}
  },
  {
    files: ['tests/fixtures/legacy-embedded-yaml/**/*.js'],
    // Preserve the frozen previous implementation used by compatibility tests.
    rules: {'no-control-regex': 'off'}
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      globals: {
        Scratch: 'readonly'
      }
    }
  }
);
