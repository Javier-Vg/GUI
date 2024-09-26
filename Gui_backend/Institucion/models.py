from django.db import models
from django.core.validators import validate_email
from django.utils import timezone
from .utils import upload_image_to_imgur 

class Institution(models.Model):  # Cambié el nombre de la clase a singular
    name = models.CharField(max_length=100, blank=False, null=False)
    direction = models.CharField(max_length=100, blank=False, null=False)
    payment_status = models.CharField(max_length=225, blank=False, null=False)
    subscription_date = models.DateField(default=timezone.now, blank=False) 
    suscription_type = models.CharField(max_length=50, blank=False)
    create_date = models.DateTimeField(auto_now_add=True)  # Establecer la fecha de creación automáticamente
    updated_date = models.DateTimeField(auto_now=True)  
    number_phone = models.CharField(max_length=15, blank=False, null=False)  # Cambié a CharField para permitir formatos de teléfono
    email = models.EmailField(validators=[validate_email], blank=False, null=True)
    image = models.ImageField(upload_to='images/') #permite cargar una imagen y guardarla en la carpeta images/ dentro del directorio de medios.
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
