from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
# Create your models here.
class contracts(models.Model):

    CONTRACT_TYPE = [
        ('Mensual', 'mensual'),
        ('Semanal', 'semanal'),
        ('Anual', 'anual'),
    ]
    
    contract_type =  models.CharField(max_length=100, blank=False, null=False, choices= CONTRACT_TYPE)
    start_date = models.DateField(blank=False, null=False)  # Cambié a DateField
    end_date = models.DateField(blank=False, null=False)  
    salary = models.FloatField(blank=False, null=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.contract_type} - {self.salary}"