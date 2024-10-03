from rest_framework import serializers
from .models import grades

class Grades_Serializer(serializers.ModelSerializer):
    class Meta:
        model = grades
        fields = ['institution','id','period', 'subject', 'grades', 'student']