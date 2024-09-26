from rest_framework import serializers
from .models import subjects

class Subjects_Serializer(serializers.ModelSerializer):
    class Meta:
        model = subjects
        fields = ['name', 'educational_level', 'institution', 'group']