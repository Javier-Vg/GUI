from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
from groups.models import group  # Importa el modelo de Institution
from .utils import upload_image_to_imgur

# Create your models here.
class students(models.Model):
    
    GRADES = [
        ('1st Grade', '1st Grade'),
        ('2nd Grade', '2nd Grade'),
        ('3rd Grade', '3rd Grade'),
        ('4th Grade', '4th Grade'),
        ('5th Grade', '5th Grade'),
        ('6th Grade', '6th Grade'),
    ]
    
    STATUS = [
        ('Active', 'active'),
        ('Inactive', 'inactive')
    ]
    
    name =  models.CharField(max_length=100, blank=False, null=False)
    last_name =  models.CharField(max_length=100, blank=False, null=False)
    identification_number =  models.CharField(max_length=100, blank=False, null=False)
    birthdate_date =   models.DateField(blank=False, null=False)
    grade =  models.CharField(max_length=100, blank=False, choices= GRADES)
    academic_status =  models.CharField(max_length=100, blank=False, null=False, choices= STATUS)
    allergy_information = models.CharField(max_length=100, blank=False, null=False)
    contact_information = models.CharField(max_length=100, blank=False, null=False)
    institution =  models.ForeignKey(Institution, on_delete=models.CASCADE)
    group =  models.ForeignKey(group, on_delete=models.CASCADE)
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
    
    #IMAGENEEEEE
    
