from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
from contracts.models import contracts  # Importa el modelo de Institution
from materias.models import subjects  # Importa el modelo de Institution
from .utils import upload_image_to_imgur 
#from schedule.models import schedule  # Importa el modelo de Institution

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
    birthdate_date =  models.CharField(max_length=100, blank=False, null=False)
    direction =  models.CharField(max_length=100, blank=False, null=False)
    phone_number =  models.CharField(max_length=100, blank=False, null=False)
    email =  models.CharField(max_length=100, blank=False, null=False)
    employment_status =  models.CharField(max_length=100, blank=False, null=False, choices = STATUS)
    position = models.CharField(max_length=100, blank=False, null=False, choices = POSITION)
    school_subjects = models.JSONField(default=list, null=True)
    salary = models.FloatField(null=True, blank=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    #schedule = models.ForeignKey(Owner, on_delete=models.CASCADE)
    contract = models.ForeignKey(contracts, on_delete=models.CASCADE)
    subjects = models.ForeignKey(subjects, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='images/', null=True) #permite cargar una imagen y guardarla en la carpeta images/ dentro del directorio de medios.
    imagen_url = models.URLField(blank=True, null=True)  #almacenará la URL de la imagen que se sube a Imgur. 
    
    def save(self, *args, **kwargs):
        # Llamar al método save para guardar la instancia y acceder a la ruta de la imagen
        super().save(*args, **kwargs)

        # Subir la imagen a Imgur y guardar la URL
        if self.imagen and not self.imagen_url:   #Verifica si hay una imagen cargada y si el campo imagen_url está vacío.
            imagen_url = upload_image_to_imgur(self.imagen.path)  #toma la ruta local de la imagen y la sube a Imgur, devolviendo la URL de la imagen.
            self.imagen_url = imagen_url #Asigna la URL obtenida al campo imagen_url del modelo.
            super().save(update_fields=['imagen_url'])
    
    def __str__(self):
        return self.name
