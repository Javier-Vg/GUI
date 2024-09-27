from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution

# Create your models here.
class contracts(models.Model):
    
    ACADEMIC_STATUS = [
        ('Active', 'active'),
        ('Inactive', 'inactive'),
        ('Graduate', 'graduate'),
    ]
    
    contract_type =  models.CharField(max_length=100, blank=False, null=False)
    start_date = models.DateField(blank=False, null=False)  # Cambié a DateField
    end_date = models.DateField(blank=False, null=False)  # Cambié a DateField
    birthdate_date =  models.DateField(blank=False, null=False)
    degree =   models.CharField(max_length=100, blank=False, null=False)
    academic_status =   models.CharField(max_length=100, blank=False, null=False, choices= ACADEMIC_STATUS)
    medic_information =   models.CharField(max_length=100, blank=False, null=False)
    contact_information =   models.CharField(max_length=100, blank=False, null=False)
    institution =  models.ForeignKey(Institution, on_delete=models.CASCADE)
    #group =  models.ForeignKey(Owner, on_delete=models.CASCADE)
    