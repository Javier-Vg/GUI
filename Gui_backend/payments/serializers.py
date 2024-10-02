from rest_framework import serializers
from .models import payments

class Payments_Serializer(serializers.ModelSerializer):
    class Meta:
        model = payments
        fields = ['payment_date', 'amount', 'payment_type' ,'payment_status', 'student']