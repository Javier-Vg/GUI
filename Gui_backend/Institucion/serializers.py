from rest_framework import serializers
from .models import Institution

class Institutions_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'name', 'direction', 'payment_status' , 'suscription_type', 'number_phone', 'email','imagen', 'imagen_url']