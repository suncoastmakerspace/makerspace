// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  trailingSlash: 'always',
  integrations: [svelte()],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  site: 'https://makerspace.github.io',
  base: '/makerspace',
  build: {
    format: 'directory',
  }
});