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
  const supportedFormats = ["jpg", "jpeg", "png", "webp", "avif", "tiff"];
    
  for (const file of files) {
    const ext = path.extname(file).slice(1).toLowerCase();
    if (!formats.includes(ext)) continue;
    if (file.startsWith(".")) continue;
    const inputPath = path.join(inputDir, file);
    const tempOutputPath = path.join(outputDir, `.temp-${file}`);
    const finalOutputPath = path.join(outputDir, file);

    try {
      if (!supportedFormats.includes(ext)) {
        console.log(`⏭ Skipping unsupported format: ${file}`);
        continue;
      }
      const { size: originalSize } = fs.statSync(inputPath);

      let img = sharp(inputPath);

      switch (ext) {
        case "jpg":
        case "jpeg":
          img = img.jpeg({ quality });
          break;
        case "png":
          img = img.png({ compressionLevel: 9 });
          break;
        case "webp":
          img = img.webp({ quality });
          break;
        case "avif":
          img = img.avif({ quality });
          break;
        case "tiff":
          img = img.tiff({ quality });
          break;
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
