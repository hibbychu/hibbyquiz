import fs from "fs-extra";
import path from "path";
import { Document, Packer, Paragraph } from "docx";

const OUTPUT_DIR = path.join(__dirname, "../../outputs");
fs.ensureDirSync(OUTPUT_DIR);

/**
 * Save plain text as .txt
 */
export async function saveTextFile(fileName: string, text: string): Promise<string> {
  const filePath = path.join(OUTPUT_DIR, `${fileName}.txt`);
  await fs.writeFile(filePath, text, "utf-8");
  return filePath;
}

/**
 * Save AI output as .docx
 */
export async function saveDocxFile(fileName: string, text: string): Promise<string> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [new Paragraph(text)],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filePath = path.join(OUTPUT_DIR, `${fileName}.docx`);
  await fs.writeFile(filePath, buffer);
  return filePath;
}
