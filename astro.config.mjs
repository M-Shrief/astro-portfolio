import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true // Enable word wrap to prevent horizontal scrolling
    }
  },

  site: 'https://m-shriet.tech',
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      entryLimit: 100
    }),
    prefetch({
      selector: ["a[href^='/projects']", "a[href^='/blog']", "a[href^='/journey']"],
      throttle: 1,
    })
  ]
});