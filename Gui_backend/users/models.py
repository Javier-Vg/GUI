from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.hashers import make_password
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, blank=False, null=True)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)
    

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Cambia esto a un nombre único
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',  # Cambia esto a un nombre único
        blank=True
    )
    USERNAME_FIELD = "username"
    
    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)  #

    def __str__(self):
        return self.username