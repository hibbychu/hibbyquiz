import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import FormData from "form-data";

const app = express();
app.use(cors());
app.use(express.json());

// Use memory storage so we can access req.file.buffer
const upload = multer({ storage: multer.memoryStorage() });

// Microservice URLs
const PDF_SERVICE = "http://localhost:5001/extract";
const AI_SERVICE = "http://localhost:5002/generate";
const FILE_SERVICE = "http://localhost:5003/save";

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
    const fileForm = {
      text: extractedText,
      aiOutput,
      fileName: req.file.originalname.split(".")[0],
    };

    const fileResponse = await axios.post(FILE_SERVICE, fileForm);

    res.json(fileResponse.data);
  } catch (err: any) {
    console.error("Orchestrator error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Orchestrator running on port ${PORT}`));
