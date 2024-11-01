from django.db import models

# Create your models here.
from django.db import models
from django.core.validators import validate_email

class Contact(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(validators=[validate_email], blank=False, null=False)

    def __str__(self):
        return self.name