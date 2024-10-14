from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from Institucion.models import Institution  # Importa el modelo de Institution
class group(models.Model):  # Cambié el nombre de la clase a singular
    group_name = models.CharField(max_length=100, blank=False, null=False)
    educational_level = models.CharField(max_length=100, blank=False, null=False)
    capacity = models.IntegerField(blank=False, null=False) #new
    current_students = models.IntegerField(blank=True) #new
    classroom = models.CharField(max_length=100, blank=False, null=False) #new
    communication_of_subjects_and_teacher = models.JSONField(null=True) #new
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.group_name

#Señal
@receiver(pre_save, sender=Institution)
def set_adoption_date(sender, instance, **kwargs):
    print("I'm working")
    instance.username = instance.username.upper()