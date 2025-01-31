from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def home(request):
    return render(request, 'home.html')

def api_ia(request):
    respuesta_ia = "Hola, soy una IA respondiendo desde Django."
    return JsonResponse({"respuesta": respuesta_ia})
