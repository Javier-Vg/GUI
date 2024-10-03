from django.db import models
from students.models import students  # Importa el modelo de Institution
from Institucion.models import Institution  # Importa el modelo de Institution


# Create your models here.
class payments(models.Model):
    
    payment_date = models.CharField(max_length=(225), null=False, blank=False)
    amount = models.CharField(max_length=(225), blank=False, null=False)
    payment_type =  models.CharField(max_length=(225), null=False, blank=False)
    payment_status =  models.CharField(max_length=(225), null=False, blank=False)
    student =  models.ForeignKey(students, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.payment_status
