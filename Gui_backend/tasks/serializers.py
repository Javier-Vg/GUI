from rest_framework import serializers
from .models import tasks

class Tasks_Serializer(serializers.ModelSerializer):
    class Meta:
        model = tasks
        fields = ['id','institution','educational_level', 'subject_group', 'student', 'subject']