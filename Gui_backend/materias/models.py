from django.db import models
from groups.models import group  # Importa el modelo de Institution
# from staff.models import staff

# Create your models here.
class subjects(models.Model):  # materia = subject
    subject_group= models.JSONField(blank=False)
    educational_level =  models.CharField(max_length=100, blank=False, null=False)
    group = models.ForeignKey(group, on_delete=models.CASCADE)
    #Notas - Foraneas