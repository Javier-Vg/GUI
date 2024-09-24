from django.db import models
from django import forms
from django.core.validators import validate_email

class Institution(models.Model):  # Cambié el nombre de la clase a singular
    name = models.CharField(max_length=100, blank=False, null=False)
    direction = models.CharField(max_length=100, blank=False, null=False)
    payment_status = models.CharField(max_length=225, blank=False, null=False)
    suscription_date = models.DateField(blank=False, null=False)  # Cambié a DateField
    suscription_type = models.CharField(max_length=50, blank=False, null=False)
    create_date = models.DateTimeField(auto_now_add=True)  # Establecer la fecha de creación automáticamente
    updated_date = models.DateTimeField(auto_now=True)  # Establecer la fecha de actualización automáticamente
    number_phone = models.CharField(max_length=15, blank=False, null=False)  # Cambié a CharField para permitir formatos de teléfono
    email = models.EmailField(validators=[validate_email], blank=False, null=True)
    
    def __str__(self):
        return self.name
