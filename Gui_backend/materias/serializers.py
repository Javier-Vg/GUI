from rest_framework import serializers
from .models import subjects

class Subjects_Serializer(serializers.ModelSerializer):
    class Meta:
        model = subjects
        fields = ['id','educational_level', 'subject_group', 'group']