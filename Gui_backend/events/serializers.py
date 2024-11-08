# Importamos el módulo de serializadores de Django REST Framework
from rest_framework import serializers
# Importamos el modelo 'events' desde nuestra aplicación
from .models import events

# Definimos el serializador para el modelo 'events'
class Events_Serializer(serializers.ModelSerializer):
    # Especificamos los campos que serán incluidos en el serializador
    class Meta:
        model = events  # Indicamos que este serializador es para el modelo 'events'
        fields = ['id', 'institution', 'event_name', 'date', 'description']  # Campos incluidos en la salida y entrada de datos

    # Validación personalizada para verificar condiciones antes de guardar
    def validate(self, data):
        """
        Validar que no se pueda crear un evento con el mismo nombre en la misma fecha.
        """
        # Obtenemos los valores del campo 'event_name' y 'date' desde los datos de entrada
        event_name = data.get('event_name')
        date = data.get('date')

        # Comprobamos si ya existe un evento con el mismo nombre y fecha en la base de datos
        if events.objects.filter(event_name=event_name, date=date).exists():
            # Si existe, lanzamos un error de validación con un mensaje personalizado
            raise serializers.ValidationError("Ya existe un evento con este nombre en esta fecha.")

        # Si pasa la validación, retornamos los datos como están
        return data
