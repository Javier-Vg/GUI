from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
from staff.models import staff  # Importa el modelo de Institution
from groups.models import groups  # Importa el modelo de Institution

# Create your models here.
class subjects(models.Model):  # materia = subject
    subject_name =  models.CharField(max_length=100, blank=False, null=False)
    educational_level =  models.CharField(max_length=100, blank=False, null=False)
    teacher = models.ForeignKey(staff, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    group = models.ForeignKey(groups, on_delete=models.CASCADE)