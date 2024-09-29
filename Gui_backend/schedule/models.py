from django.db import models
from materias.models import subjects  # Importa el modelo de Institution
from staff.models import staff  # Importa el modelo de Institution

# Create your models here.
class schedule(models.Model):
    
    id = models.AutoField(primary_key=True)
    start_time = models.CharField(max_length=(225), null=False, blank=False)
    end_time = models.CharField(max_length=(225), blank=False, null=False)
    subject =  models.ForeignKey(subjects, on_delete=models.CASCADE)
    staff =  models.ForeignKey(staff, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.start_time

    
