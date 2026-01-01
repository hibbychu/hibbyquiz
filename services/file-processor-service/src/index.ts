import express from "express";

const app = express();
app.use(express.json());

app.post("/save", async (req, res) => {
  try {
    const { text, aiOutput } = req.body;
    if (!text || !aiOutput) return res.status(400).send("Missing data");

    // Just send the text back, don't save files
    res.json({
      txtContent: text,
      docxContent: aiOutput,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to process files" });
  }
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`File Processor Service running on port ${PORT}`);
});
