from django.db import models
from students.models import students # Importa el modelo de Institution
from materias.models import subjects
import json

# Create your models here.
class tasks(models.Model):  # materia = subject
    subject_group= models.JSONField(blank=False)
    educational_level =  models.CharField(max_length=100, blank=False, null=False)
    student = models.ForeignKey(students, on_delete=models.CASCADE)
    subject = models.ForeignKey(subjects, on_delete=models.CASCADE)
    
    def __str__(self):
        # Convertir el JSON a una cadena legible
        return json.dumps(self.subject_group)