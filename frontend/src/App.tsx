import React, { useState } from "react";
import DragDropPDF from "./components/DragDropPDF";
import { uploadPDF } from "./services/api";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await uploadPDF(file);
      console.log("Response from Orchestrator:", res);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to process PDF");
    } finally {
      setLoading(false);
    }
  };

  const textBoxStyle: React.CSSProperties = {
    maxHeight: "300px",
    overflowY: "scroll",
    overflowX: "hidden",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    marginTop: "5px",
  };

  const aiBoxStyle: React.CSSProperties = {
    ...textBoxStyle,
    backgroundColor: "#f0f0f0",
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Jirachi PDF AI Assistant</h1>

      <DragDropPDF onFileSelected={handleFileUpload} />

      {loading && <p>⏳ Processing your PDF...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20, width: "80%", maxWidth: "800px" }}>
          <h3>✅ PDF Processed!</h3>

          {result.originalText && (
            <div style={{ marginBottom: 20 }}>
              <h4>Extracted Text from PDF:</h4>
              <button
                onClick={() => navigator.clipboard.writeText(result.originalText)}
                style={{ marginBottom: "5px" }}
              >
                Copy Extracted Text
              </button>
              <pre style={textBoxStyle}>{result.originalText}</pre>
            </div>
          )}

          {result.aiOutput && (
            <div style={{ marginBottom: 20 }}>
              <h4>AI Output:</h4>
              <button
                onClick={() => navigator.clipboard.writeText(result.aiOutput)}
                style={{ marginBottom: "5px" }}
              >
                Copy AI Output
              </button>
              <pre style={aiBoxStyle}>{result.aiOutput}</pre>
            </div>
          )}

          {/* {result.processedText && (
            <div style={{ marginBottom: 20 }}>
              <h4>Processed Text (File Processor):</h4>
              <button onClick={() => navigator.clipboard.writeText(result.processedText)}>
                Copy Processed Text
              </button>
              <pre style={textBoxStyle}>{result.processedText}</pre>
            </div>
          )}

          {result.processedAI && (
            <div style={{ marginBottom: 20 }}>
              <h4>Processed AI Output (File Processor):</h4>
              <button onClick={() => navigator.clipboard.writeText(result.processedAI)}>
                Copy Processed AI
              </button>
              <pre style={aiBoxStyle}>{result.processedAI}</pre>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333333",
    padding: "20px",
  },
  title: {
    color: "#F9E967",
    marginBottom: "20px",
  },
};

export default App;
