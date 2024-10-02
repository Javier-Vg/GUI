from django.db import models
from groups.models import group  # Importa el modelo de Institution
import json

# Create your models here.
class subjects(models.Model):  # materia = subject
    subject_group= models.JSONField(blank=False)
    educational_level =  models.CharField(max_length=100, blank=False, null=False)
    group = models.ForeignKey(group, on_delete=models.CASCADE)
    
    def __str__(self):
        # Convertir el JSON a una cadena legible
        return json.dumps(self.subject_group)