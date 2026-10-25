import { defineConfig } from 'tsup'
import pkg from './package.json';

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
    // Inline the version instead of importing package.json into the bundle
    define: {
      __ASTRO_CLOUDINARY_VERSION__: JSON.stringify(pkg.version),
    },
  };
});