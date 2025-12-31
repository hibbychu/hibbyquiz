import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadPDF } from "../services/api";

const DragDropPDF: React.FC = () => {
  const [message, setMessage] = useState<string>("Drag and drop your PDF here");
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setLoading(true);
    setMessage("Uploading...");
    try {
      const result = await uploadPDF(acceptedFiles[0]);
      console.log("AI Output:", result);
      setMessage("PDF processed successfully! Check console for output.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to process PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        ...styles.dropzone,
        borderColor: isDragActive ? "#7EC8E3" : "#F9E967",
        backgroundColor: "#F0F8FF",
      }}
    >
      <input {...getInputProps()} />
      <p>{loading ? "Processing..." : message}</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  dropzone: {
    border: "2px dashed #F9E967",
    borderRadius: "10px",
    padding: "40px",
    textAlign: "center",
    width: "400px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#333333",
  },
};

export default DragDropPDF;
