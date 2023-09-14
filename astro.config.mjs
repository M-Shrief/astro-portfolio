import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true, // Enable word wrap to prevent horizontal scrolling
    },
  },
  integrations: []
});