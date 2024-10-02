from django.db import models
from django.core.validators import validate_email
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import pre_save

class Institution(models.Model):  # Cambié el nombre de la clase a singular
    name = models.CharField(max_length=100, blank=False, null=False)
    direction = models.CharField(max_length=100, blank=False, null=False)
    payment_status = models.CharField(max_length=225, blank=False, null=False)
    subscription_date = models.DateField(auto_now_add=True, blank=False) 
    suscription_type = models.CharField(max_length=50, blank=False)
    create_date = models.DateTimeField(auto_now_add=True)  # Establecer la fecha de creación automáticamente
    updated_date = models.DateTimeField(auto_now=True)  
    number_phone = models.CharField(max_length=15, blank=False, null=False)  # Cambié a CharField para permitir formatos de teléfono
    email = models.EmailField(validators=[validate_email], blank=False, null=True)
<<<<<<< HEAD
    imagen_url = models.URLField(blank=True, null=True)  #almacenará la URL de la imagen que se sube a Imgur. 
    
=======
    #imagen_url = models.URLField(blank=True, null=True)  #almacenará la URL de la imagen que se sube a Imgur. 
>>>>>>> 5f0a02b2be8752aedb9be033a3fe8a48adaa3c1e

    def __str__(self):
        return self.name

#Señal
@receiver(pre_save, sender=Institution)
def set_adoption_date(sender, instance, **kwargs):
    print("I'm working")
    instance.name = instance.name.upper()