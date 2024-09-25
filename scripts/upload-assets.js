require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const assets = require('./assets.json');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

(async function run() {
  await uploadAssets(assets, {
    folder: process.env.CLOUDINARY_ASSETS_DIRECTORY || 'assets',
  });
  console.log('Finished.');
})();

/**
 * uploadAssets
 */

async function uploadAssets(assets, { folder }) {
  console.log(`Uploading ${assets.length} assets to cloud "${process.env.CLOUDINARY_CLOUD_NAME}" in folder ${folder}...`);

  for ( let i = 0; i < assets.length; i++ ) {
    const { url, publicId, resourceType, type } = assets[i];

    try {
      const result = await cloudinary.uploader.upload(url, {
        folder,
        public_id: publicId,
        resource_type: resourceType || 'image',
        type: type || 'upload'
      });
      console.log(`Success: ${result.secure_url}`);
    } catch(e) {
      console.log(`Error uploading ${publicId}: ${e.message}`);
    }
  }
}