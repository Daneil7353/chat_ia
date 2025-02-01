import requests
from django.shortcuts import render
from django.http import JsonResponse
from huggingface_hub import InferenceClient

# Create your views here.
token = "REDACTED"
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
    api_ext = True
    prompt = request.GET.get("prompt","")
    response = ""

    if prompt:
        if api_ext:
            response = call_huggingface_api(prompt)
        else:    
            response = requests.get(API_URL, params={"prompt": prompt})
        
    return render(request, "home.html", {"response_text": response})
