import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const publicRoot = path.resolve('public')
const outputRoot = path.join(publicRoot, 'images', 'generated')
const sourceDirectories = [
  path.join(publicRoot, 'images'),
  path.join(publicRoot, 'images', 'projects'),
]
const widths = [480, 768, 1200]

await mkdir(outputRoot, { recursive: true })

for (const directory of sourceDirectories) {
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.webp')) continue
    const source = path.join(directory, entry.name)
    const stem = path.basename(entry.name, '.webp')
    for (const width of widths) {
      const destination = path.join(outputRoot, `${stem}-${width}.webp`)
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(destination)
    }
  }
}

console.log(`Generated responsive WebP derivatives in ${path.relative(process.cwd(), outputRoot)}`)
