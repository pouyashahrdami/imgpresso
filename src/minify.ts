import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function optimizeFolder(
  inputDir: string,
  outputDir: string,
  quality: number,
  formats: string[]
) {
  fs.mkdirSync(outputDir, { recursive: true });
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    const ext = path.extname(file).slice(1).toLowerCase();
    if (!formats.includes(ext)) continue;

    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    try {
      let img = sharp(inputPath);
      if (ext === "jpg" || ext === "jpeg") {
        img = img.jpeg({ quality });
      } else if (ext === "png") {
        img = img.png({ compressionLevel: 9 });
      } else if (ext === "webp") {
        img = img.webp({ quality });
      }
      await img.toFile(outputPath);
    } catch (e) {}
  }
}
