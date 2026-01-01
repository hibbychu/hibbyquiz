import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // AI output or file paths
};
