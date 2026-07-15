import fs from 'fs';
import path from 'path';

const basePath = '/Users/ayushsatvara/CodeWorld/SP_Design';
const componentsPath = path.join(basePath, 'src', 'components');
const appPath = path.join(basePath, 'src', 'app');

const structure = {
  common: ['Navbar.tsx', 'Footer.tsx', 'SmoothScrollProvider.tsx', 'OrnateDivider.tsx'],
  home: ['Hero.tsx', 'InteriorSketch.tsx', 'interiorSketchPaths.ts', 'Services.tsx'],
  work: ['WorkHero.tsx', 'MagazineFlip.tsx', 'WorkShowcase.tsx'],
  about: ['About.tsx'],
  quotation: ['Quotation.tsx']
};

const fileToFolderMap = {};

// Create dirs and map
for (const [folder, files] of Object.entries(structure)) {
  const dirPath = path.join(componentsPath, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  for (const file of files) {
    fileToFolderMap[file] = folder;
  }
}

// Move files
for (const [file, folder] of Object.entries(fileToFolderMap)) {
  const oldPath = path.join(componentsPath, file);
  const newPath = path.join(componentsPath, folder, file);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${file} to ${folder}/`);
  }
}

// Walk through all files to update imports
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const allFiles = [...getFiles(componentsPath), ...getFiles(appPath)];

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [file, folder] of Object.entries(fileToFolderMap)) {
    const baseName = file.replace('.tsx', '').replace('.ts', '');
    
    // Replace absolute imports @/components/BaseName
    const absoluteRegex = new RegExp(`@/components/${baseName}(["'])`, 'g');
    if (absoluteRegex.test(content)) {
      content = content.replace(absoluteRegex, `@/components/${folder}/${baseName}$1`);
      changed = true;
    }
    
    // Specifically handle interiorSketchPaths relative import in InteriorSketch.tsx
    if (file === 'interiorSketchPaths.ts' && filePath.endsWith('InteriorSketch.tsx')) {
      const relativeRegex = new RegExp(`\.\/interiorSketchPaths`);
      if (relativeRegex.test(content)) {
        // Since they are now in the same folder 'home', the relative import './interiorSketchPaths' is STILL VALID! 
        // No change needed for this specific relative import if they are moved together.
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
});

console.log('Restructure complete.');
