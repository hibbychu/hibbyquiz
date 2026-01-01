import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import FormData from "form-data";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
// Serve static files from outputs folder
app.use("/outputs", express.static("/app/services/outputs"));

app.get("/outputs/:fileName", (req, res, next) => {
  console.log("Requesting file:", req.params.fileName);
  next();
});

// Use memory storage so we can access req.file.buffer
const upload = multer({ storage: multer.memoryStorage() });

// Microservice URLs
const PDF_SERVICE = process.env.PDF_SERVICE!;
const AI_SERVICE = process.env.AI_SERVICE!;
const FILE_SERVICE = process.env.FILE_SERVICE!;

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1️⃣ Send file buffer to PDF service
    const pdfForm = new FormData();
    pdfForm.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const pdfResponse = await axios.post(PDF_SERVICE, pdfForm, {
      headers: pdfForm.getHeaders(),
    });
    const extractedText = pdfResponse.data.text;

    // 2️⃣ Send extracted text to AI service
    const aiResponse = await axios.post(AI_SERVICE, { text: extractedText });
    const aiOutput = aiResponse.data.aiOutput;

    // 3️⃣ Send text + AI output to File Processor service
    const fileForm = { text: extractedText, aiOutput };
    const fileResponse = await axios.post(FILE_SERVICE, fileForm);

    // 4️⃣ Send everything to frontend
    res.json({
      originalText: extractedText,
      aiOutput: aiOutput,
      processedText: fileResponse.data.txtContent,
      processedAI: fileResponse.data.docxContent,
    });
  } catch (err: any) {
    console.error("Orchestrator error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Orchestrator running on port ${PORT}`));
