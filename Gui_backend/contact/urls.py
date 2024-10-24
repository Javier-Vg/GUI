# contact/urls.py
from django.urls import path
from .views import enviar_correo

urlpatterns = [
    path('enviar-correo/', enviar_correo, name='enviar-correo'),
]
