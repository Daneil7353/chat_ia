import torch
from fastapi import FastAPI
from transformers import AutoModelForCausalLM, AutoTokenizer
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración del modelo en GPU si es posible
device = "cuda" if torch.cuda.is_available() else "cpu"

# Cargar modelo y tokenizador correctamente
modelo_nombre = "HuggingFaceH4/zephyr-7b-beta"
modelo_ia = AutoModelForCausalLM.from_pretrained(modelo_nombre, torch_dtype=torch.bfloat16, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(modelo_nombre)

@app.get("/generate/")
def generate_text(prompt: str):
    # Construcción correcta del mensaje en formato ChatML
    prompt_formateado = f"<|user|>\n{prompt}\n<|assistant|>"

    # Tokenización del prompt
    inputs = tokenizer(prompt_formateado, return_tensors="pt").to(device)

    # Generación de la respuesta
    max_new_tokens = min(200, len(inputs["input_ids"][0]) + 100)
    output = modelo_ia.generate(
        **inputs, 
        max_new_tokens=max_new_tokens, 
        temperature=0.7, 
        top_p=0.9, 
        do_sample=True, 
        eos_token_id=tokenizer.eos_token_id)

    # Decodificación de la respuesta
    respuesta = tokenizer.decode(output[0], skip_special_tokens=True)

    return {"generated_text": respuesta}

# Ejecutar la API en local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
