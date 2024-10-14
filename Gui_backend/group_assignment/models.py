from django.db import models
from groups.models import group
from students.models import students
from django.db.models.signals import pre_save, post_delete, post_save
from django.dispatch import receiver

class group_assignment(models.Model):  # Cambié el nombre de la clase a singular
    registration_day = models.CharField(max_length=100, blank=False, null=False)
    student = models.ForeignKey(students, on_delete=models.CASCADE, null=True, blank=True)
    group = models.ForeignKey(group, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.group
    
#Señal
@receiver(post_save, sender=students)
def increment_current_students(sender, instance, created, **kwargs):
    if created:  # Si el estudiante se ha creado
        instance.group.current_students += 1  # Aumentar el conteo
        instance.group.save()  # Guardar el grupo actualizado

@receiver(post_delete, sender=students)
def decrement_current_students(sender, instance, **kwargs):
    instance.group.current_students -= 1  # Disminuir el conteo
    instance.group.save()  # Guardar el grupo actualizado
    

#created es True: Esto indica que se ha creado una nueva instancia del modelo. 
# En otras palabras, se está llamando a save() 
# en una instancia que no existía en la base de datos antes.