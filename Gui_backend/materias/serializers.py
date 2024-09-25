from rest_framework import serializers
from .models import subjects

class Subjects_Serializer(serializers.ModelSerializer):
    class Meta:
        model = subjects
        fields = ['name', 'last_name', 'identification_number' ,'birthdate_date', 'grade', 'academcic_status', 'allergy_information', 'contact_information']