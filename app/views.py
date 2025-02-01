import requests
from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
API_URL = "http://127.0.0.1:5000/generate/"

def generate_text(request):
    prompt = request.GET.get("prompt","")
    response_text = ""

    if prompt:
        response = requests.get(API_URL, params={"prompt": prompt})
        if response.status_code == 200:
            response_text = response.json().get("generated_text", "Error al generar texto")

    return render(request, "home.html", {"response_text": response_text})
