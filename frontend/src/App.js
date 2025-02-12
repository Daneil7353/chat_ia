import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { reportWebVitals } from 'web-vitals';

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

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

      setMessages(prevMessages => [
        ...prevMessages,
        { type: "user", text: cleanPrompt },
        { type: "assistant", text: aiResponse }
      ]);

      setPrompt("");
      } catch (error) {
      console.error("Error al obtener respuesta:", error);
      setMessages("Error fetching response: " + error.message);
  } finally {
      setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">AI Text Generator</h1>
      <div className="w-full max-w-xl h-96 overflow-y-auto p-4 bg-gray-800 rounded-lg">
        {response.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg my-2 ${msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
            <strong>{msg.type === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
      </div>
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
    </div>
  );
}
