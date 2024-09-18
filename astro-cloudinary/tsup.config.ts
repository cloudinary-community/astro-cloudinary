import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    clean: true,
    entry: [
      './src/helpers/index.ts',
      './src/loaders/index.ts',
    ],
    dts: true,
    minify: false,
    bundle: true,
    sourcemap: true,
    format: ['esm'],
    external: ['astro', 'node:async_hooks', '#async-local-storage'],
  };
});