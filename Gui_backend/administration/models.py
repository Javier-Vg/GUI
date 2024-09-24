from django.db import models
from django.core.validators import validate_email
from Institucion.models import Institution  # Importa el modelo de Institution

# Create your models here.
class administration(models.Model):
    
    name =  models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(validators=[validate_email], blank=False, null=True)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    rol =  models.CharField(max_length=225, blank=False, null=False)