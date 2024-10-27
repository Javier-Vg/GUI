# contact/urls.py
from django.urls import path
from .views import enviar_correo

urlpatterns = [
    path('enviar_correo/', enviar_correo, name='enviar-correo'),
]
