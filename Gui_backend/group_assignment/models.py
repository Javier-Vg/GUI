from django.db import models
from groups.models import group
from students.models import students
from django.db.models.signals import pre_save, post_delete, post_save
from django.dispatch import receiver

class group_assignment(models.Model):  # Cambié el nombre de la clase a singular
    registration_day = models.DateField(auto_now_add=True, blank=False)
    student = models.ForeignKey(students, on_delete=models.CASCADE, null=True, blank=True)
    group = models.ForeignKey(group, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.group


