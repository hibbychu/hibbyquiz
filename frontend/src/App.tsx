import React from 'react';
import DragDropPDF from "./components/DragDropPDF";
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Jirachi PDF AI Assistant</h1>
      <DragDropPDF />
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
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333333",
  },
  title: {
    color: "#F9E967",
    marginBottom: "20px",
  },
};

export default App;
