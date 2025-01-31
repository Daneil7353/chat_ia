from django.urls import path
from . import views

urlpatterns - [
    path('', views.home, name='home'),
    path('api/ia/', views.api_ia, name='api_ia'),
]