
from django.db import models
from groups.models import group  # Importa el modelo de Institution
from students.models import students 
from staff.models import staff

class grades(models.Model):  # Cambié el nombre de la clase a singular
    grade_results = models.JSONField( blank=False, null=False)
    student = models.ForeignKey(students, on_delete=models.CASCADE)
    group = models.ForeignKey(group, on_delete=models.CASCADE)
    teacher = models.ForeignKey(staff, on_delete=models.CASCADE)
    period = models.CharField(max_length=100, blank=False, null=False)
    def __str__(self):
        return self.period
