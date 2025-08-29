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
      const response = await fetch("http://127.0.0.1:8000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("⚠️ Failed to fetch summary. Please try again.");
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
          Note Summarizer
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
          placeholder="Enter your note here..."
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
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {/* Summary output */}
        {summary && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              color: "black",
              whiteSpace: "pre-wrap", // preserve line breaks
            }}
          >
            <h2 style={{ color: "#1F54DD", marginBottom: "10px" }}>Summary</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: summary
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold text
                  .replace(/^- (.*)/gm, "<li>$1</li>") // convert - to list items
                  .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>") // wrap list items in <ul>
                  .replace(/\n/g, "<br/>"), // keep new lines
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
