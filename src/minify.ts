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
    const tempOutputPath = path.join(outputDir, `.temp-${file}`);
    const finalOutputPath = path.join(outputDir, file);

    try {
      const { size: originalSize } = fs.statSync(inputPath);

      let img = sharp(inputPath);

      if (ext === "jpg" || ext === "jpeg") {
        img = img.jpeg({ quality });
      } else if (ext === "png") {
        img = img.png({ compressionLevel: 9 });
      } else if (ext === "webp") {
        img = img.webp({ quality });
      } else {
        console.log(`⏭ Unsupported format: ${file}`);
        continue;
      }
      await img.toFile(tempOutputPath);
      const { size: newSize } = fs.statSync(tempOutputPath);
      if (newSize < originalSize) {
        fs.renameSync(tempOutputPath, finalOutputPath);
        const saved = originalSize - newSize;
        const percent = ((saved / originalSize) * 100).toFixed(1);
        console.log(
          `✅ ${file} → ${(newSize / 1024).toFixed(1)} KB (${percent}% saved)`
        );
      } else {
        fs.unlinkSync(tempOutputPath); // Remove the temp file
        console.log(
          `❌ ${file} not saved (new file was larger: ${(
            newSize / 1024
          ).toFixed(1)} KB)`
        );
      }
    } catch (e) {}
  }
}
