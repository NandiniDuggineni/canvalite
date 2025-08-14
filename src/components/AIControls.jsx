import React, { useState } from "react";
import { generateText, generateImage } from "../ai/aiClient";

export default function AIControls({ onAddText, onAddImage }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleText = async () => {
    setLoading(true);
    const text = await generateText(prompt);
    onAddText(text);
    setLoading(false);
  };

  const handleImage = async () => {
    setLoading(true);
    const imgUrl = await generateImage(prompt);
    onAddImage(imgUrl);
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Enter AI prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "70%", padding: "5px" }}
      />
      <button onClick={handleText} disabled={loading} style={{ marginLeft: 10 }}>
        Generate Text
      </button>
      <button onClick={handleImage} disabled={loading} style={{ marginLeft: 10 }}>
        Generate Image
      </button>
    </div>
  );
}
