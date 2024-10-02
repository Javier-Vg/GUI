from django.db import models
from groups.models import group
import json

# Create your models here.
class schedule(models.Model):
    days= models.JSONField(blank=False)
    start_time = models.CharField(max_length=(225), null=False, blank=False)
    end_time = models.CharField(max_length=(225), blank=False, null=False)
    group =  models.ForeignKey(group, on_delete=models.CASCADE)
    
    def __str__(self):
        # Convertir el JSON a una cadena legible
        return json.dumps(self.days)
