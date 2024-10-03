from rest_framework import serializers
from .models import schedule

class Schedule_Serializer(serializers.ModelSerializer):
    class Meta:
        model = schedule
        fields = ['id','start_time', 'end_time', 'group', 'days' ]