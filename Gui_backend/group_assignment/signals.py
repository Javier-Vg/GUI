from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import students, group_assignment

@receiver(post_save, sender=group_assignment)
def incrementar_current_students(sender, instance, created, **kwargs):
    if created:
        instance.group.current_students += 1
        instance.group.save()

@receiver(post_delete, sender=group_assignment)
def decrementar_current_students(sender, instance, **kwargs):
    instance.group.current_students -= 1
    instance.group.save()
    # 'group' es la foranea de la tabla group_assignment
    
#created es True: Esto indica que se ha creado una nueva instancia del modelo. 
# En otras palabras, se está llamando a save() 
# en una instancia que no existía en la base de datos antes.
