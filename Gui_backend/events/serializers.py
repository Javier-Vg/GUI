from rest_framework import serializers
from .models import events

class Events_Serializer(serializers.ModelSerializer):
    class Meta:
        model = events
        fields = ['id', 'institution', 'event_name', 'date', 'description']

    def validate(self, data):
        """
        Validar que no se pueda crear un evento con el mismo nombre en la misma fecha.
        """
        event_name = data.get('event_name')
        date = data.get('date')

        # Comprobar si ya existe un evento con el mismo nombre y fecha
        if events.objects.filter(event_name=event_name, date=date).exists():
            raise serializers.ValidationError("Ya existe un evento con este nombre en esta fecha.")

        return data
