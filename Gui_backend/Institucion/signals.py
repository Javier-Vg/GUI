
from django.dispatch import receiver
from Institucion.models import Institution
from django.db.models.signals import pre_save

@receiver(pre_save, sender=Institution)
def set_adoption_date(sender, instance, **kwargs):
    print("I'm working")
    instance.name = instance.name.upper()