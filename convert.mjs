import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workDir = path.join(__dirname, 'public', 'images', 'work');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const newPath = path.join(dir, `${name}.webp`);
      
      console.log(`Converting ${fullPath} to ${newPath}`);
      try {
        await sharp(fullPath)
          .webp({ quality: 90 }) // 90 is very high quality for webp, lossless: true makes it extremely huge, maybe quality 90 is better than lossless true for photographs.
          .toFile(newPath);
        
        console.log(`Successfully converted ${file} to webp.`);
        // Remove old file
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

processDirectory(workDir).then(() => {
  console.log('Conversion complete.');
});
