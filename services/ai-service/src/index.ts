import dotenv from "dotenv";
dotenv.config(); // Load variables from .env

import express from "express";
import { getAIOutput } from "./chatGPT";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).send("No text provided");

    const prompt = "Summarize the following PDF content for a report:";
    const aiOutput = await getAIOutput(text, prompt);

    res.json({ aiOutput });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate AI output" });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`AI service running on port ${PORT}`);
});
