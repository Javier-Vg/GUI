from rest_framework import serializers
from .models import contracts

class Contracts_Serializer(serializers.ModelSerializer):
    class Meta:
        model = contracts
        fields = ['contract_type', 'start_date', 'end_date', 'birthdate_date', 'degree', 'academic_status', 'medic_information', 'contact_information']