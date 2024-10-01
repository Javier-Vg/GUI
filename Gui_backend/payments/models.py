from django.db import models
from students.models import students  # Importa el modelo de Institution

# Create your models here.
class payments(models.Model):
    
    payment_date = models.CharField(max_length=(225), null=False, blank=False)
    amount = models.CharField(max_length=(225), blank=False, null=False)
    payment_type =  models.CharField(max_length=(225), null=False, blank=False)
    payment_status =  models.CharField(max_length=(225), null=False, blank=False)
    student =  models.ForeignKey(students, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.payment_status
