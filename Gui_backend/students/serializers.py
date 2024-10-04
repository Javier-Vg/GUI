from rest_framework import serializers
from .models import students

class Students_Serializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = ['password','institution','id','name', 'last_name', 'identification_number' ,'birthdate_date', 'grade', 'academic_status', 'allergy_information', 'contact_information','imagen_url','email','guardian_phone_number','name_guardian', 'monthly_payent_students','type_of_student']