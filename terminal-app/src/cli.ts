#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

const program = new Command();
program.version("1.0.0");

const ORCHESTRATOR_URL = "http://localhost:4000/upload";

program
  .argument("<file>", "PDF file path to process")
  .action(async (file) => {
    if (!fs.existsSync(file)) {
      console.error("File does not exist");
      process.exit(1);
    }

    const form = new FormData();
    form.append("file", fs.createReadStream(file));

    console.log("Uploading PDF to Orchestrator...");

    try {
      const response = await axios.post(ORCHESTRATOR_URL, form, {
        headers: form.getHeaders(),
      });

      console.log("PDF processed successfully!");
      console.log("Output files:", response.data);
    } catch (err: any) {
      console.error("Failed to process PDF:", err.message);
    }
  });

program.parse();
