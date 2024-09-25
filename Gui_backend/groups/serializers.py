from rest_framework import serializers
from .models import groups

class Groups_Serializer(serializers.ModelSerializer):
    class Meta:
        model = groups
        fields = ['group_name', 'educational_level']