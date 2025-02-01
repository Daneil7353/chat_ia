import torch
from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()

# Cargar el modelo en local (esto puede tardar un poco)
modelo_ia = pipeline("text-generation", model="gpt2", torch_dtype=torch.bfloat16, device=-1)

@app.get("/generate/")
def generate_text(prompt: str):
    resultado = modelo_ia(prompt, max_length=50)
    return {"generated_text": resultado[0]["generated_text"]}

# Ejecutar la API en local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
