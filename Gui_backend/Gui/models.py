from django.db import models

# Create your models here.
from django.db import models

class Admin_Gui(models.Model):
    # Campos del modelo
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Puedes usar un Hash para almacenar contraseñas
    rol = models.CharField(max_length=50)  # Define roles según tus necesidades
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.nombre
