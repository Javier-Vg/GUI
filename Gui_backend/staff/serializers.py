from rest_framework import serializers
from .models import staff

class Staff_Serializer(serializers.ModelSerializer):
    class Meta:
        model = staff
        fields = ['name', 'last_name', 'identification_number' ,'birthdate_date', 'direction', 'phone_number', 'email', 'employment_status', 'position' ,'salary', 'institution', 'subjects', 'contract']