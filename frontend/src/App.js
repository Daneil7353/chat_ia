import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { reportWebVitals } from 'web-vitals';

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/generate/?prompt=" + encodeURIComponent(prompt));
      const data = await res.json();
      setResponse(data.generated_text);
    } catch (error) {
      setResponse("Error fetching response");
    }
    setLoading(false);
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
        <p className="mt-2 whitespace-pre-line">{response || "Waiting for response..."}</p>
      </div>
    </div>
  );
}
