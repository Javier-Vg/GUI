from django.db import models
from groups.models import group
from students.models import students

class group_assignment(models.Model):  # Cambié el nombre de la clase a singular
    registration_day = models.CharField(max_length=100, blank=False, null=False)
    student = models.ForeignKey(students, on_delete=models.CASCADE, null=True, blank=True)
    group = models.ForeignKey(group, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.group