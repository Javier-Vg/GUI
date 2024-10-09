from django.db import models
from django.core.validators import validate_email
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.hashers import make_password

class Institution(models.Model):  # Cambié el nombre de la clase a singular
    username = models.CharField(max_length=100, blank=False, null=False)
    direction = models.CharField(max_length=100, blank=False, null=False)
    payment_status = models.CharField(max_length=225, blank=False, null=False)
    subscription_date = models.DateField(auto_now_add=True, blank=False) 
    suscription_type = models.CharField(max_length=50, blank=False)
    create_date = models.DateTimeField(auto_now_add=True)  # Establecer la fecha de creación automáticamente
    updated_date = models.DateTimeField(auto_now=True)  
    number_phone = models.CharField(max_length=15, blank=False, null=False)  # Cambié a CharField para permitir formatos de teléfono
    email = models.EmailField(validators=[validate_email], blank=False, null=True)
    imagen_url = models.URLField(blank=True, null=True)  #almacenará la URL de la imagen que se sube a Imgur. 
    monthly_payent = models.FloatField(null=False)
    password = models.CharField(max_length=200, blank=False, null=True) 
    def __str__(self):
        return self.username

#Señal
    def save(self, *args, **kwargs):
        # Solo hacer hash si la contraseña ha sido modificada
        if self.pk is None or not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super(Institution, self).save(*args, **kwargs)
@receiver(pre_save, sender=Institution)
def set_adoption_date(sender, instance, **kwargs):
    print("I'm working")
    instance.username = instance.username.upper()