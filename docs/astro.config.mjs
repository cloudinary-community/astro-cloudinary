import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Astro Cloudinary',
      social: {
        github: 'https://github.com/colbyfayock/astro-cloudinary'
      },
      sidebar: [{
        label: 'CldImage',
        items: [{
          label: 'Basic Usage',
          slug: 'cldimage/basic-usage'
        }]
      }, {
        label: 'CldVideoPlayer',
        items: [{
          label: 'Basic Usage',
          slug: 'cldvideoplayer/basic-usage'
        }]
      }],
      customCss: [
        './src/styles/tailwind.css',
      ],
    }), 
    tailwind({
      applyBaseStyles: false,
    }),
  ]
});