import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',

  experimental: {
    contentLayer: true,
  },

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
              label: 'CldUploadWidget',
              items: [
                {
                  label: 'Basic Usage',
                  slug: 'clduploadwidget/basic-usage'
                },
                {
                  label: 'Configuration',
                  slug: 'clduploadwidget/configuration'
                },
                {
                  label: 'Signed Uploads',
                  slug: 'clduploadwidget/signed-uploads'
                },
                {
                  label: 'Examples',
                  slug: 'clduploadwidget/examples'
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
          label: 'Loaders',
          items: [
            {
              label: 'cldAssetsLoader',
              items: [
                {
                  label: 'Basic Usage',
                  slug: 'cldassetsloader/basic-usage'
                },
                {
                  label: 'Configuration',
                  slug: 'cldassetsloader/configuration'
                },
                {
                  label: 'Examples',
                  slug: 'cldassetsloader/examples'
                },
              ]
            },
          ]
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'Background Removal',
              slug: 'guides/background-removal'
            },
            {
              label: 'Delivering Remote Images',
              slug: 'guides/delivering-remote-images'
            },
            {
              label: 'Image Optimization',
              slug: 'guides/image-optimization'
            },
            {
              label: 'Image Overlays',
              slug: 'guides/image-overlays'
            },
            {
              label: 'Responsive Images',
              slug: 'guides/responsive-images'
            },
            {
              label: 'Social Media Card',
              slug: 'guides/social-media-card'
            },
            {
              label: 'Text Overlays',
              slug: 'guides/text-overlays'
            },
            {
              label: 'Uploading Images & Videos',
              slug: 'guides/uploading-images-and-videos'
            },
          ]
        },
        {
          label: 'Templates',
          items: [
            {
              label: 'Social Media Cards',
              slug: 'templates/social-media-cards'
            }
          ]
        }
      ],
      customCss: ['./src/styles/tailwind.css'],
      components: {
        Hero: './src/components/Null.astro',
        Head: './src/components/Head.astro',
      },
    }),
    tailwind({
      applyBaseStyles: false
    }),
    icon()
  ],

  redirects: {
    '/guides/responsive-sizing': '/guides/responsive-images'
  },

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  }),
});
