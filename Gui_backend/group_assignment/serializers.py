from rest_framework import serializers
from .models import group_assignment

class GroupAssignment_Serializer(serializers.ModelSerializer):
    class Meta:
        model = group_assignment
        fields = ['id', 'registration_day', 'student', 'group']