import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: "https://astrotestwabpage.netlify.app"
    // Other configurations...
    ,build: {
    rollupOptions: {
      external: ['@astrojs/rss']
    }
  }
});
