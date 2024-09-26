from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
from groups.models import group  # Importa el modelo de Institution

# Create your models here.
class subjects(models.Model):  # materia = subject
    name =  models.CharField(max_length=100, blank=False, null=False)
    educational_level =  models.CharField(max_length=100, blank=False, null=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    group = models.ForeignKey(group, on_delete=models.CASCADE)