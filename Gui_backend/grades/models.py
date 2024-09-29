from django.db import models
from materias.models import subjects  # Importa el modelo de Institution
from students.models import students  # Importa el modelo de Institution

class grades(models.Model):  # Cambié el nombre de la clase a singular
    grade = models.CharField(max_length=100, blank=False, null=False)
    period = models.CharField(max_length=100, blank=False, null=False)
    student = models.ForeignKey(students, on_delete=models.CASCADE)
    subject = models.ForeignKey(subjects, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
