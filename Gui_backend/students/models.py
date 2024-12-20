from django.db import models
from Institucion.models import Institution 
from groups.models import group  
from django.contrib.auth.hashers import make_password
from django.db.models.signals import pre_save
from django.dispatch import receiver
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
    
    TYPE=[
        ('private student','private student'),
        ('student care network','student care network')
    ]
    
    username = models.CharField(max_length=100, blank=False, null=False)
    last_name = models.CharField(max_length=100, blank=False, null=False)
    identification_number = models.CharField(max_length=100, blank=False, null=False)
    birthdate_date = models.DateField(blank=False, null=False)
    grade = models.CharField(max_length=100, blank=False, choices=GRADES)
    academic_status = models.CharField(max_length=100, blank=False, null=False, choices=STATUS)
    allergy_information = models.CharField(max_length=100, blank=False, null=False)
    contact_information = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(max_length=254, blank=False, null=False)
    guardian_phone_number = models.CharField(max_length=15, blank=True, null=True)  # Nuevo campo opcional
    name_guardian = models.CharField(max_length=100, blank=False, null=False)  # Nuevo campo para el nombre del encargado
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    group = models.BooleanField(default=False)
    imagen_url = models.URLField(blank=True, null=True)
    monthly_payent_students = models.CharField(max_length=15, blank=True, null=True)
    type_of_student = models.CharField(max_length=100, blank=False, choices=TYPE, default='private student')
    is_student = models.BooleanField(default=True)
    password = models.CharField(max_length=128, blank=False, null=True) 
    
    def save(self, *args, **kwargs):
        # Solo hacer hash si la contraseña ha sido modificada
        if self.pk is None or not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super(students, self).save(*args, **kwargs)
    def __str__(self):
        return self.username
