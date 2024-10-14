from django.db import models
from staff.models import staff
import datetime
from Institucion.models import Institution  # Importa el modelo de Institution


# Create your models here.
class message(models.Model):  # materia = subject

    date= datetime.datetime.now()
    message =  models.CharField(max_length=500, blank=False, null=False)
    receiver = models.ForeignKey(staff, on_delete=models.CASCADE, blank=False, related_name="messages_received")
    transmitter = models.ForeignKey(staff, on_delete=models.CASCADE, related_name="messages_sent")
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.message
    