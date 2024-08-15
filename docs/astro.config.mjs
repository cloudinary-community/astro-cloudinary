import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

export default defineConfig({
  integrations: [
    starlight({
      title: 'Astro Cloudinary',
      social: {
        github: 'https://github.com/colbyfayock/astro-cloudinary'
      },
      sidebar: [
        {
          label: 'Installation',
          link: 'installation'
        },
        {
          label: 'CldImage',
          items: [
            {
              label: 'Basic Usage',
              slug: 'cldimage/basic-usage'
            },
            {
              label: 'Configuration',
              slug: 'cldimage/configuration'
            },
            {
              label: 'Examples',
              slug: 'cldimage/examples'
            }
          ]
        },
        {
          label: 'CldVideoPlayer',
          items: [
            {
              label: 'Basic Usage',
              slug: 'cldvideoplayer/basic-usage'
            },
            {
              label: 'Configuration',
              slug: 'cldvideoplayer/configuration'
            },
            {
              label: 'Examples',
              slug: 'cldvideoplayer/examples'
            }
          ]
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'Responzive Sizing',
              slug: 'guides/responsive-sizing'
            }
          ]
        }
      ],
      customCss: ['./src/styles/tailwind.css'],
      components: {
        Hero: './src/components/Null.astro',
      },
    }),
    tailwind({
      applyBaseStyles: false
    }),
    icon()
  ],
});