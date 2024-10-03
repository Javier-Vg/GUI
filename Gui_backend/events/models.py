from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
class events(models.Model):  # Cambié el nombre de la clase a singular
    event_name = models.CharField(max_length=100, blank=False, null=False)
    date =  models.DateField(blank=False) 
    description = models.CharField(max_length=500, blank=False, null=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.event_name
