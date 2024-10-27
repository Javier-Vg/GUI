from django.db import models
from staff.models import staff  # Importa el modelo de Institution
from Institucion.models import Institution  # Importa el modelo de Institution
from groups.models import group


# Create your models here.
class student_assistance(models.Model):

    dateToday =  models.CharField(max_length=100, blank=False, null=False)
    daily_attendance = models.JSONField(blank=False)
    teacher =  models.ForeignKey(staff, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    group = models.ForeignKey(group, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.date
    