from django.db import models
from students.models import students 
from django.core.validators import validate_email
from Institucion.models import Institution  # Importa el modelo de Institution


# Create your models here.
class parents(models.Model):
    
    name = models.CharField(max_length=(225), null=False, blank=False)
    email = models.EmailField(validators=[validate_email], blank=False, null=True)
    student_association =  models.CharField(max_length=(225), blank=False, null=False)
    student =  models.ForeignKey(students, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.name
