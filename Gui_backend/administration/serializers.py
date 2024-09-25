from rest_framework import serializers
from .models import administration

class Administration_Serializer(serializers.ModelSerializer):
    class Meta:
        model = administration
        fields = ['name', 'email', 'rol' ]