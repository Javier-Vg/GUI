from rest_framework import serializers
from .models import Institution

class Institutions_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id','monthly_payent', 'name', 'direction', 'payment_status' , 'suscription_type', 'subscription_date','number_phone', 'email', 'imagen_url']