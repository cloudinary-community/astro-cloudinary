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
          label: 'Components',
          items: [
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
          ]
        },
        {
          label: 'Helpers',
          items: [
            {
              label: 'getCldImageUrl',
              items: [
                {
                  label: 'Basic Usage',
                  slug: 'getcldimageurl/basic-usage'
                },
                {
                  label: 'Configuration',
                  slug: 'getcldimageurl/configuration'
                },
                {
                  label: 'Examples',
                  slug: 'getcldimageurl/examples'
                }
              ]
            },
            {
              label: 'getCldOgImageUrl',
              items: [
                {
                  label: 'Basic Usage',
                  slug: 'getcldogimageurl/basic-usage'
                },
                {
                  label: 'Configuration',
                  slug: 'getcldogimageurl/configuration'
                },
                {
                  label: 'Examples',
                  slug: 'getcldogimageurl/examples'
                }
              ]
            },
            {
              label: 'getCldVideoUrl',
              items: [
                {
                  label: 'Basic Usage',
                  slug: 'getcldvideourl/basic-usage'
                },
                {
                  label: 'Configuration',
                  slug: 'getcldvideourl/configuration'
                },
                {
                  label: 'Examples',
                  slug: 'getcldvideourl/examples'
                }
              ]
            },
          ]
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'Responsive Sizing',
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