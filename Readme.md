# 🖼️ imgpresso

**A blazing-fast, local image optimizer CLI built with Node.js + TypeScript.**  
Compress JPG, PNG, WebP, AVIF, and TIFF images without using any external APIs (no TinyPNG, no limits).

---

## 🚀 Features

- ✅ Supports JPG, PNG, WebP, AVIF, and TIFF
- ✅ Converts formats (e.g. PNG → WebP) ➡️ Future
- ✅ Smart compression: skips if new file is bigger
- ✅ CLI with quality and format options
- ✅ Works offline – no API keys needed
- ✅ TypeScript-powered and open source

---

## 📦 Installation

### Use via `npm`

```bash
npm i imgpresso
```

### Use via `npx` (no install)

```bash
npx imgpresso ./images
```

### Or install globally

```bash
npm install -g imgpresso
imgpresso ./images
```

---

### 🛠️ Usage

```bash
imgpresso <input-folder> [options]
```

### Basic Example

```bash
imgpresso ./images --quality 70

```

---

### 🧪 Coming Soon

Watch mode (--watch)

GUI drag-and-drop interface

## VS Code extension

### 🤝 Contributing

Pull requests, ideas, and issues are welcome!
If you find a bug or want a new feature, open an issue or PR.
