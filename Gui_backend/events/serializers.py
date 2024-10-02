from rest_framework import serializers
from .models import events

class Events_Serializer(serializers.ModelSerializer):
    class Meta:
        model = events
        fields = ['event_name', 'date', 'description', 'institution']