from django.db import models
from staff.models import staff  # Importa el modelo de Institution
import datetime

# Create your models here.
class teaching_assistance(models.Model):

    STATUS = [
        ('Present', 'present'),
        ('Absent ', 'absent'),
    ]

    status = models.CharField(max_length=(225), null=False, blank=False, choices= STATUS)
    date =  datetime.datetime.now()
    staff =  models.ForeignKey(staff, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.date
