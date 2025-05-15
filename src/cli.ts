#!/usr/bin/env node

import { Command, program } from "commander";
import { optimizeFolder } from "./minify";

program
  .name("imgpresso")
  .description("CLI to optimize images in a folder")
  .version("1.0.0")
  .argument("<input>", "Input folder")
  .option("-o, --output <output>", "Output folder", "compressed")
  .option("-q, --quality <quality>", "Quality from 1-100", "75")
  .option(
    "--formats <formats>",
    "Comma-separated list (jpg,png,webp)",
    "jpg,png,webp"
  )
  .action((input, options) => {
    const { output, quality, formats } = options;
    optimizeFolder(input, output, parseInt(quality), formats.split(","));
  });
program.parse();
