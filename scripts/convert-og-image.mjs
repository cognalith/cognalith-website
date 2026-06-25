import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Read the SVG file
const svgPath = join(publicDir, 'og-image.svg');
const svg = readFileSync(svgPath, 'utf8');

// Convert to PNG
const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: 1200,
  },
  font: {
    loadSystemFonts: true,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

// Write the PNG file
const pngPath = join(publicDir, 'og-image.png');
writeFileSync(pngPath, pngBuffer);

console.log(`✅ Created og-image.png (${pngBuffer.length} bytes)`);
console.log(`   Dimensions: ${pngData.width} x ${pngData.height}`);
