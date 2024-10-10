from rest_framework import serializers
from .models import staff

class Staff_Serializer(serializers.ModelSerializer):
    class Meta:
        model = staff
        fields = ['id','username', 'last_name', 'identification_number' ,'birthdate_date',"password", 'direction', 'phone_number', 'email', 'employment_status', 'position' , 'institution', 'contract', 'schedule', 'imagen_url']