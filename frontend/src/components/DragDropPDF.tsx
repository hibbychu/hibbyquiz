import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (file: File) => void;
}

const DragDropPDF: React.FC<Props> = ({ onFileSelected }) => {
  const [message, setMessage] = useState("Drag & drop your PDF here");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      onFileSelected(acceptedFiles[0]);
    },
    [onFileSelected]
  );

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
      }}
    >
      <input {...getInputProps()} />
      <p>{message}</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  dropzone: {
    border: "2px dashed #F9E967",
    borderRadius: 10,
    padding: "40px",
    textAlign: "center",
    width: 400,
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#F0F8FF",
  },
};

export default DragDropPDF;
