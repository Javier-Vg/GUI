from rest_framework import serializers
from .models import parents

class Parents_Serializer(serializers.ModelSerializer):
    class Meta:
        model = parents
        fields = ['id','institution','name', 'email', 'student_association' ,'student']