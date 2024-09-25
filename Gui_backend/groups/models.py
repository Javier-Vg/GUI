from django.db import models
from django.core.validators import validate_email
from Institucion.models import Institution  # Importa el modelo de Institution
from teachers.models import teachers  # Importa el modelo de Institution

class groups(models.Model):  # Cambié el nombre de la clase a singular
    group_name = models.CharField(max_length=100, blank=False, null=False)
    educational_level = models.CharField(max_length=100, blank=False, null=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    teacher = models.ForeignKey(teachers, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
