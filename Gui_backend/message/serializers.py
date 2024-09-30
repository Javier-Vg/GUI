from rest_framework import serializers
from .models import message

class Message_Serializer(serializers.ModelSerializer):
    class Meta:
        model = message
        fields = [ 'message', 'receiver' ,'transmitter']