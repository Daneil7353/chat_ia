import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { reportWebVitals } from 'web-vitals';

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    setQuestion("");

    try {
      const res = await fetch("http://localhost:5000/generate/?prompt=" + encodeURIComponent(prompt));

      // Verifica si la respuesta es exitosa
      if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // Verifica si la API devuelve la estructura esperada
      if (!data.generated_text) {
          throw new Error("Invalid response structure: " + JSON.stringify(data));
      }
      let text = data.generated_text;
      const parts = text.split("<|assistant|>");
      const aiResponse = parts.length > 1 ? parts[1].trim() : text;
      const cleanPrompt = prompt?.replace("<|user|>", "").trim() || "";
      setQuestion(cleanPrompt);
      setResponse(aiResponse);
  } catch (error) {
      console.error("Error al obtener respuesta:", error);
      setResponse("Error fetching response: " + error.message);
  } finally {
      setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">AI Text Generator</h1>
      <textarea
        className="w-full max-w-xl p-2 rounded-lg text-black"
        rows="4"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={sendPrompt}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="mt-4 w-full max-w-xl p-2 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold">Response:</h2>
        <p className="mt-2 whitespace-pre-line">{question || "Waiting for response..."}</p>
        <p className="mt-2 whitespace-pre-line">{response || ""}</p>
      </div>
    </div>
  );
}
