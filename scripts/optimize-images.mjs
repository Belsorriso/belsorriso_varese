import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGE_DIR = './public/images';
const QUALITY = 80;

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  const before = (await stat(filePath)).size;

  await sharp(filePath)
    .webp({ quality: QUALITY })
    .toFile(webpPath);

  const after = (await stat(webpPath)).size;
  const saved = ((before - after) / before * 100).toFixed(1);

  console.log(`${filePath.replace('./public/images/', '')} → webp  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${saved}%)`);

  return { before, after };
}

async function main() {
  const images = await findImages(IMAGE_DIR);
  console.log(`Trovate ${images.length} immagini...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const img of images) {
    const { before, after } = await optimizeImage(img);
    totalBefore += before;
    totalAfter += after;
  }

  console.log(`\nTotale: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${((totalBefore-totalAfter)/totalBefore*100).toFixed(1)}%)`);
  console.log('\nFatto. Ora aggiorna i riferimenti .jpg → .webp nel codice.');
}

main().catch(console.error);
