from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import group_assignment, group

@receiver(post_save, sender=group_assignment)
def incrementar_current_students(sender, instance, created, **kwargs):
    if created:
        if instance.group.capacity != instance.group.current_students:
            instance.group.current_students += 1
            instance.group.save()

@receiver(post_delete, sender=group_assignment)
def decrementar_current_students(sender, instance, **kwargs):
    if instance.group.current_students > 0:
        instance.group.current_students -= 1
        instance.group.group -= 1
    instance.group.save()
    # 'group' es la foranea de la tabla group_assignment
    
#created es True: Esto indica que se ha creado una nueva instancia del modelo. 
# En otras palabras, se está llamando a save() 
# en una instancia que no existía en la base de datos antes.