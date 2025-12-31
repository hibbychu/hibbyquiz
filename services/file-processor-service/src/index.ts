import express from "express";
import { saveTextFile, saveDocxFile } from "./fileHandler";

const app = express();
app.use(express.json());

app.post("/save", async (req, res) => {
  try {
    const { text, aiOutput, fileName } = req.body;
    if (!text || !aiOutput || !fileName) return res.status(400).send("Missing data");

    const txtPath = await saveTextFile(fileName, text);
    const docxPath = await saveDocxFile(fileName, aiOutput);

    res.json({ txtPath, docxPath });
  } catch (err) {
    res.status(500).json({ error: "Failed to save files" });
  }
});

app.listen(5003, () => {
  console.log("File Processor service running on port 5003");
});
