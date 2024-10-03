from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
class group(models.Model):  # Cambié el nombre de la clase a singular
    group_name = models.CharField(max_length=100, blank=False, null=False)
    educational_level = models.CharField(max_length=100, blank=False, null=False)
    capacity = models.IntegerField(blank=False, null=False) #new
    classroom = models.CharField(max_length=100, blank=False, null=False) #new
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.group_name
