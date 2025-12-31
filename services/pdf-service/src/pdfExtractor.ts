// services/pdf-service/src/pdfExtractor.ts
import { Buffer } from "buffer";
import pdfParse from "pdf-parse-fixed";

export async function extractPDFText(buffer: Buffer): Promise<string> {
  console.log("==============================================");
  console.log("📄 PDF Extractor Called");
  console.log("==============================================");

  if (!buffer) {
    console.error("❌ ERROR: No buffer received.");
    throw new Error("No file buffer provided");
  }

  console.log("📥 Buffer received.");
  console.log("   • Size:", buffer.length, "bytes");
  console.log("   • First 20 bytes:", buffer.slice(0, 20));

  // Check if file *looks* like a PDF (%PDF-)
  const header = buffer.toString("utf-8", 0, 5);
  console.log("🔎 PDF Header Check:", header);

  if (!header.startsWith("%PDF-")) {
    console.warn("⚠️ WARNING: File does not start with %PDF- header. Parsing may fail.");
  }

  // Check pdfParse function
  console.log("🔍 pdfParse type:", typeof pdfParse);
  if (typeof pdfParse !== "function") {
    console.error("❌ ERROR: pdfParse is NOT a function.");
    throw new Error("pdfParse did not load correctly");
  }

  console.log("🚀 Sending buffer to pdfParse...");
  const start = Date.now();

  try {
    const pdfData = await pdfParse(buffer);

    const end = Date.now();
    console.log("⏱️ pdfParse finished in", end - start, "ms");

    if (!pdfData) {
      console.error("❌ ERROR: pdfParse returned NULL or undefined.");
      throw new Error("pdfParse returned no data");
    }

    console.log("📄 Extraction Results:");
    console.log("   • Text length:", pdfData.text?.length);
    console.log("   • Number of pages:", pdfData.numpages);
    console.log("   • Info keys:", Object.keys(pdfData.info || {}));

    if (!pdfData.text || pdfData.text.trim().length === 0) {
      console.warn("⚠️ WARNING: Extracted PDF text is empty!");
    }

    console.log("✅ PDF extraction completed successfully.");
    console.log("==============================================");

    return pdfData.text;
  } catch (err) {
    const end = Date.now();
    console.error("❌ pdfParse threw an error after", end - start, "ms");
    console.error("   Error message:", err);

    throw new Error("Failed to extract PDF text (pdfParse error)");
  }
}
