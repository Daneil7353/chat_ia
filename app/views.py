import requests
from django.shortcuts import render
from django.http import JsonResponse
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

# Create your views here.
load_dotenv()
token = os.getenv("HF_TOKEN")
API_URL_EXT = "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
API_URL = "http://127.0.0.1:5000/generate/"

def call_huggingface_api(prompt):
    headers = {"Authorization": f"Bearer {token}"}
    data = {"inputs": prompt}

    response = requests.post(API_URL_EXT, headers=headers, json=data)

    if response.status_code != 200:
        return {"error": response.text}  # Devuelve un error si falla la API

    data = response.json()  # Devuelve la respuesta de la API
    
    if isinstance(data, list):  # La API a veces devuelve una lista
        return data[0]  # Extraer el primer resultado

    return data
        

def generate_text(request):
    api_ext = False
    prompt = request.GET.get("prompt","")
    response = ""
    response_text = ""

    if prompt:
        if api_ext:
            response_text = call_huggingface_api(prompt)
        else:    
            response = requests.get(API_URL, params={"prompt": prompt})
            if response.status_code == 200:
                response_text = response.json().get("generated_text", "Error al generar texto")

            
    return render(request, "home.html", {"response_text": response_text})
        
    
