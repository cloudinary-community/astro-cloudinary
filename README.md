<a href="https://github.com/cloudinary-community/astro-cloudinary/actions/workflows/test_and_release.yml"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/cloudinary-community/astro-cloudinary/test_and_release.yml?branch=main&label=Test%20%26%20Release&style=flat-square"></a> <a href="https://www.npmjs.com/package/astro-cloudinary"><img alt="npm" src="https://img.shields.io/npm/v/astro-cloudinary?style=flat-square"></a> <a href="https://bundlephobia.com/package/astro-cloudinary"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/astro-cloudinary?style=flat-square&label=Minified%20Size"></a> <a href="https://github.com/cloudinary-community/astro-cloudinary/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/cloudinary-community/astro-cloudinary?label=License&style=flat-square"></a>


# Astro Cloudinary

High-performance image delivery and uploading at scale in Astro powered by Cloudinary.

<a href="#-features">Features</a> • <a href="#-getting-started">Getting Started</a> • <a href="#%EF%B8%8F-community--support">Community & Support</a> • <a href="#-contributing">Contributing</a>

**This is a community library supported by the Cloudinary Developer Experience team.**

## ✨ Features

* Automatically optimize images and deliver in modern formats
* Remove backgrounds from images
* Dynamically add image and text overlays to images
* AI-based cropping and resizing
* Transform images using color and effects
* Generate Open Graph Social Media cards on the fly
* Drop-in Upload Widget
* ...all at scale with Cloudinary


## 🚀 Getting Started

### Installation

* Install `astro-cloudinary` with:

```
npm install astro-cloudinary
```

* Add an environment variable with your Cloud Name:
```
PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

### Adding an Image

```
import { CldImage } from 'astro-cloudinary';

<CldImage width="600" height="600" src="<Public ID or Cloudinary URL>" alt="<Alt Text>" />
```

[Learn more about CldImage on the Astro Cloudinary Docs](https://astro.cloudinary.dev/cldimage/basic-usage)

## ❤️ Community & Support

* [GitHub: Create an Issue](https://github.com/cloudinary-community/astro-cloudinary/issues)
* [Twitter: @colbyfayock](https://twitter.com/colbyfayock)

## 🛠 Contributing

Please read [CONTRIBUTING.md](https://github.com/cloudinary-community/astro-cloudinary/blob/main/CONTRIBUTING.md) prior to contributing.

### Working Locally

#### Installation

This project is using [pnpm](https://pnpm.io/) as a way to manage dependencies and workspaces.

With the project cloned, install the dependencies from the root of the project with:

```
pnpm install
```

#### Configuration

To work on the project, you need to have an active Cloudinary account. With the account, configure a `.env` file inside of `docs` with:

```
PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloudinary Cloud Name>"
PUBLIC_CLOUDINARY_API_KEY="<Your Cloudinary API Key>"
CLOUDINARY_API_SECRET="<Your Cloudinary API Secret>"

PUBLIC_ASSETS_DIRECTORY="assets"
```

> Note: The Cloudinary account can be free, but some features may not work beyond free tier like Background Removal

The Cloud Name is required for all usage, where the API Key and Secret currently is only used for Upload Widget usage. The Upload Preset is additionally used for the Upload Widgets.

#### Uploading Example Images

In order to run the Docs project, you need to have the images referenced available inside of your Cloudinary account.

To do this, navigate to the `scripts` directory and first create a new `.env` file with:

```
CLOUDINARY_CLOUD_NAME="<Your Cloudinary Cloud Name>"
CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
```

Then run the upload script with:

```
pnpm upload
```

By default, the images and videos inside of `scripts/assets.json` will be uploaded to the "assets" directory inside of your Cloudinary account. To change the location, add the `CLOUDINARY_ASSETS_DIRECTORY` environment variable with your preferred directory:

```
CLOUDINARY_ASSETS_DIRECTORY="<Your Directory>"
```

#### Running the Project

Once installed and configured, open two terminal tabs, navigating one to `astro-cloudinary` and one to `docs`, running the following command in each:

```
pnpm dev
```

The project will now be available at <https://localhost:3000> or the configured local port.


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://colbyfayock.com/newsletter"><img src="https://avatars.githubusercontent.com/u/1045274?v=4?s=100" width="100px;" alt="Colby Fayock"/><br /><sub><b>Colby Fayock</b></sub></a><br /><a href="https://github.com/cloudinary-community/astro-cloudinary/commits?author=colbyfayock" title="Code">💻</a> <a href="https://github.com/cloudinary-community/astro-cloudinary/commits?author=colbyfayock" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
