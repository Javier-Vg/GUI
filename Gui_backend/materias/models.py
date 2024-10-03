from django.db import models
import json
from Institucion.models import Institution  # Importa el modelo de Institution


# Create your models here.
class subjects(models.Model):  # materia = subject
    name = models.CharField(max_length=100, blank=False, null=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        # Convertir el JSON a una cadena legible
        return json.dumps(self.name)