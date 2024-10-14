from rest_framework import serializers
from .models import contracts

class Contracts_Serializer(serializers.ModelSerializer):
    class Meta:
        model = contracts
        fields = ['id','institution','contract_type', 'start_date', 'end_date', 'salary']