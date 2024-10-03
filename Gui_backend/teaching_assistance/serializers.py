from rest_framework import serializers
from .models import teaching_assistance

class TeachingAssistance_Serializer(serializers.ModelSerializer):
    class Meta:
        model = teaching_assistance
        fields = ['id','status', 'staff']