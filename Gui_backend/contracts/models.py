from django.db import models

# Create your models here.
class contracts(models.Model):
    
    ACADEMIC_STATUS = [
        ('Active', 'active'),
        ('Inactive', 'inactive'),
        ('Graduate', 'graduate'),
    ]

    CONTRACT_TYPE = [
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


    def __str__(self):
        return f"{self.academic_status} - {self.contact_information}"