from rest_framework import serializers
from .models import Institution

class Institutions_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
<<<<<<< HEAD
        fields = ['id','monthly_payent', 'name', 'direction', 'payment_status' , 'suscription_type', 'subscription_date','number_phone', 'email', 'imagen_url']
=======
        fields = ['id', 'name', 'direction', 'payment_status' , 'suscription_type', 'subscription_date','number_phone', 'email']
>>>>>>> 5f0a02b2be8752aedb9be033a3fe8a48adaa3c1e
