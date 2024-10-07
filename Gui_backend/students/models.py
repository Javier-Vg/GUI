from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
from groups.models import group  # Importa el modelo de Institution

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
    name = models.CharField(max_length=100, blank=False, null=False)
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
    group = models.ForeignKey(group, on_delete=models.CASCADE, null=True, blank=True)   
    imagen_url = models.URLField(blank=True, null=True)
    monthly_payent_students = models.CharField(max_length=15, blank=True, null=True)
    type_of_student = models.CharField(max_length=100, blank=False, choices=TYPE, default='private student')
    password = models.CharField(max_length=15, blank=False, null=True) 

    
    
    def __str__(self):
        return self.name
    
    #IMAGENEEEEE
    
