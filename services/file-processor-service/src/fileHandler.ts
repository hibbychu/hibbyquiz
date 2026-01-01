import fs from "fs-extra";
import path from "path";
import { Document, Packer, Paragraph } from "docx";

const OUTPUT_DIR = path.join(__dirname, "../../outputs");
fs.ensureDirSync(OUTPUT_DIR);

/**
 * Save plain text as .txt
 */
export async function saveTextFile(fileName: string, text: string): Promise<string> {
  // Just return the text, no need to write a file
  return text;
}

export async function saveDocxFile(fileName: string, text: string): Promise<string> {
  // Just return the text (the "AI output")
  return text;
}

