from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution

# Create your models here.
class subjects(models.Model):  # materia = subject
    
    STATUS = [
        ('Inactive', 'inactive'),
        ('Active', 'active'),
        ('Graduate', 'graduate'),
    ]
    
    name =  models.CharField(max_length=100, blank=False, null=False)
    last_name =  models.CharField(max_length=100, blank=False, null=False)
    identification_number =  models.CharField(max_length=100, blank=False, null=False)
    birthdate_date =   models.DateField(blank=False, null=False)
    grade =  models.CharField(max_length=100, blank=False, choices= STATUS)
    academcic_status =  models.CharField(max_length=100, blank=False, null=False)
    #group =  models.ForeignKey(Institution, on_delete=models.CASCADE)
    institution =  models.ForeignKey(Institution, on_delete=models.CASCADE)
    allergy_information = models.CharField(max_length=100, blank=False, null=False)
    contact_information = models.CharField(max_length=100, blank=False, null=False)
    image = models.CharField(max_length=100, blank=False, null=True)
    
