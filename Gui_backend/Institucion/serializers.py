from rest_framework import serializers
from .models import Institution

class Institutions_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'direction', 'payment_status' ,'suscription_date', 'suscription_type', 'number_phone', 'email']