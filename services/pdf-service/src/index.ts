// services/pdf-service/src/index.ts
import express from "express";
import multer from "multer";
import { extractPDFText } from "./pdfExtractor";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/extract", upload.single("file"), async (req, res) => {
  console.log("--------------------------------------------------");
  console.log("📨 PDF Service: /extract hit");
  console.log("   • Timestamp:", new Date().toISOString());

  if (!req.file) {
    console.error("❌ ERROR: No file found in request.");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("📁 File Uploaded:");
  console.log("   • Original name:", req.file.originalname);
  console.log("   • MIME type:", req.file.mimetype);
  console.log("   • Size:", req.file.size, "bytes");

  try {
    const text = await extractPDFText(req.file.buffer);

    console.log("📤 Sending extracted text to client...");
    res.json({ text });
  } catch (err) {
    console.error("❌ PDF extraction failed:", err);
    res.status(500).json({ error: "Failed to extract PDF text" });
  }
});

app.listen(5001, () => {
  console.log("🚀 PDF service running on port 5001");
});
