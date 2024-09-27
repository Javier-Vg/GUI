from rest_framework import serializers
from .models import students

class Students_Serializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = ['id','name', 'last_name', 'identification_number' ,'birthdate_date', 'grade', 'academic_status', 'allergy_information', 'contact_information', 'imagen', 'imagen_url', 'institution', 'group']