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

    const prompt = "analyse the attached documents of the lecture slides and craft me 30 questions quiz to test myself and to help me study the content; each question should have four options (a–d) and only one correct answer; randomize which letter (a, b, c, or d) is correct so they are not all the same; at the end of each question, show the correct answer in this format: Answer: [letter]) [text of correct answer]; example format: Question: What is the main intelligence agency behind North Korean cyber operations? a) CIA b) Reconnaissance General Bureau c) MI6 d) FSB Answer: b) Reconnaissance General Bureau; ensure that the correct answers are evenly distributed among a, b, c, and d; avoid having the same letter correct more than twice in a row; mix easy, medium, and hard difficulty levels.:";
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
