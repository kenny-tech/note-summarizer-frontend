import React, { useState } from "react";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: text }),
      });

      const data = await response.json();
      console.log(data);
      setSummary(data.analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setSummary("Failed to fetch analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "white",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#1F54DD" }}>
          Data Analyzer
        </h1>

        <textarea
          rows={8}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          placeholder="Paste your data here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: loading ? "#999" : "#1F54DD",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {summary && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
              background: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              color: "#000",
              whiteSpace: "pre-wrap",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            {summary}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
