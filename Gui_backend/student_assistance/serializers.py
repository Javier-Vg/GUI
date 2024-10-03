from rest_framework import serializers
from .models import student_assistance

class StudentAssistance_Serializer(serializers.ModelSerializer):
    class Meta:
        model = student_assistance
        fields = ['id','institution','status', 'staff']