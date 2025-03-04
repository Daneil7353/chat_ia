import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { reportWebVitals } from 'web-vitals';

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

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
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "error", text: "Error fetching response: " + error.message },
      ]);
  } finally {
      setLoading(false);
  }
  };
  // TODO: MOVE ALL STYLE INTO CSS
  return (
    <div className={'min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300'}>
      <header className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">AI Chat</h1>
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="m-4 w-full md:w-11/12 lg:w-5/6 flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {response.map((msg, index) => (
          <div key={index} className={`p-3 rounded-lg my-2 ${
            msg.type === "user" ? "bg-blue-500 text-white" :
            msg.type === "assistant" ? "bg-gray-300 dark:bg-gray-700" : "bg-red-500 text-white"
          }`}>
            <strong>{msg.type === "user" ? "You" : msg.type === "assistant" ? "AI" : "Error"}:/</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="w-full max-w-2xl items-center justify-center flex flex-col p-4">
        <textarea
          className="w-full p-2 rounded-lg text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
          rows="3"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="w-2/5 md:w-3/5 lg:w-11/12 inline-flex items-center justify-center p-5 leading-3 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
          onClick={sendPrompt}
          disabled={loading}
        >
          <span class="text-white font-bold p-2 text-lg">{loading ? 'Generando ' : 'Generar respuesta '}</span>
          <span class={`ml-2 -my-2 opacity-${loading ? "100" : "0"}`} >
            <svg class="spinner fill-current text-white w-8 h-8" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <rect class="spinner-rect" x="0" y="0" width="100" height="100" fill="none"></rect>
                <circle class="spinner-circle" cx="50" cy="50" r="40" stroke="currentColor" fill="none" stroke-width="12" stroke-linecap="round">
                </circle>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );


    

}
