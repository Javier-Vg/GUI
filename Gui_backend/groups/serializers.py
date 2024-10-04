from rest_framework import serializers
from .models import group

class Groups_Serializer(serializers.ModelSerializer):
    class Meta:
        model = group
        fields = ['id','institution','subject_group', 'group_name', 'educational_level', 'institution', 'capacity', 'classroom']