# contact/urls.py
from django.urls import path
from .views import send_email

urlpatterns = [
    # path('enviar_correo/', enviar_correo, name='enviar-correo'),
    path('enviar_correo/', send_email, name='enviar-correo'),
    
]
