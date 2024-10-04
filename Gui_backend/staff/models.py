from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
from contracts.models import contracts  
from materias.models import subjects 
from schedule.models import schedule
from django.core.validators import validate_email
#from schedule.models import schedule  

# Create your models here.
class staff(models.Model):
    
    STATUS = [
        ('Inactive', 'inactive'),
        ('Active', 'active'),
    ]
    
    POSITION = [
        ('Teacher', 'teacher'),
        ('Directors', 'directors'),
        ('Educational counselors', 'educational counselors'),
        ('Secretaries', 'secretaries'),
        ('Cleaning staff', 'cleaning staff'),
        ('Librarians', 'librarians'),
        ('Security staff', 'security staff')
    ]
    
    name =  models.CharField(max_length=100, blank=False, null=False)
    last_name =  models.CharField(max_length=100, blank=False, null=False)
    identification_number =  models.CharField(max_length=100, blank=False, null=False)
    birthdate_date =  models.DateField(blank=False, null=False)
    direction =  models.CharField(max_length=100, blank=False, null=False)
    phone_number =  models.IntegerField(blank=False, null=False) #new
    email =  models.EmailField(validators=[validate_email], blank=False, null=True)
    employment_status =  models.CharField(max_length=100, blank=False, null=False, choices = STATUS)
    position = models.CharField(max_length=100, blank=False, null=False, choices = POSITION)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=False)
    schedule = models.ForeignKey(schedule, on_delete=models.CASCADE, null=False)
    contract = models.ForeignKey(contracts, on_delete=models.CASCADE, related_name='related_contracts')
    imagen_url = models.URLField(blank=True, null=True)  #almacenará la URL de la imagen que se sube a Imgur. 

    def __str__(self):
        return self.name
