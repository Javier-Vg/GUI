from django.db import models
from groups.models import group
import json
from Institucion.models import Institution  # Importa el modelo de Institution

# Create your models here.
class schedule(models.Model):
    days= models.JSONField(blank=False)
    start_time = models.CharField(max_length=(225), null=False, blank=False)
    end_time = models.CharField(max_length=(225), blank=False, null=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        # Convertir el JSON a una cadena legible
        return json.dumps(self.days)
