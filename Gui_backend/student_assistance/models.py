from django.db import models
from students.models import students  # Importa el modelo de Institution
import datetime

# Create your models here.
class student_assistance(models.Model):

    STATUS = [
        ('Present', 'present'),
        ('Absent ', 'absent'),
    ]

    status = models.CharField(max_length=(225), null=False, blank=False, choices= STATUS)
    date =  datetime.datetime.now()
    staff =  models.ForeignKey(students, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.date
