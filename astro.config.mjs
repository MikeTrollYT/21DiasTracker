import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://21diastracker.es',
  base: '/',
  output: 'static',
  build: {
    outDir: './dist',
  },
});