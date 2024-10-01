from rest_framework import serializers
from .models import teachers

class Teachers_Serializer(serializers.ModelSerializer):
    class Meta:
        model = teachers
        fields = ['name', 'last_name', 'identification_number' ,'birthdate_date', 'direction', 'phone_number', 'email', 'employment_status']