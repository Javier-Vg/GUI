from django.db import models
from django.core.validators import validate_email
from Institucion.models import Institution  # Importa el modelo de Institution

# Create your models here.
class teachers(models.Model):
    
    STATUS = [
        ('Inactive', 'inactive'),
        ('Active', 'active'),
    ]
    
    name =  models.CharField(max_length=100, blank=False, null=False)
    last_name =  models.CharField(max_length=100, blank=False, null=False)
    identification_number =  models.CharField(max_length=100, blank=False, null=False)
    birthdate_date =  models.CharField(max_length=100, blank=False, null=False)
    direction =  models.CharField(max_length=100, blank=False, null=False)
    phone_number =  models.CharField(max_length=100, blank=False, null=False)
    email =  models.CharField(max_length=100, blank=False, null=False)
    employment_status =  models.CharField(max_length=100, blank=False, null=False, choices = STATUS)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    # schedule = models.ForeignKey(Owner, on_delete=models.CASCADE)
    # contract = models.ForeignKey(Owner, on_delete=models.CASCADE)