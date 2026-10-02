import { readdir, readFile, writeFile } from 'node:fs/promises';

const directory = new URL('../public/api/galerias/', import.meta.url);
const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort();
const entries = await Promise.all(files.map(async (file) => {
  const photos = JSON.parse(await readFile(new URL(file, directory), 'utf8'));
  return [file.slice(0, -5), Array.isArray(photos) ? photos.length : 0];
}));
await writeFile(new URL('../src/data/galleryCounts.json', import.meta.url), JSON.stringify(Object.fromEntries(entries), null, 2) + '\n');
