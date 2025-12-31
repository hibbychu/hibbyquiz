import axios from "axios";

const API_BASE = "http://localhost:4000"; // Orchestrator endpoint

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // AI output or file paths
};
