# Importamos los módulos y clases necesarios de Django REST Framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status  # Para utilizar códigos de estado HTTP estándar
from .models import events  # Importamos el modelo 'events' de nuestra aplicación
from .serializers import Events_Serializer  # Importamos el serializador para 'events'
from rest_framework.permissions import IsAuthenticated, AllowAny  # Permisos de autenticación
import jwt  # Importamos JWT si se usa para autenticación o manejo de tokens

# Definimos un conjunto de vistas (ViewSet) para el modelo 'events'
class EventsViewSet(viewsets.ModelViewSet):
    # Especificamos el conjunto de datos a trabajar, en este caso, todos los eventos
    queryset = events.objects.all()
    # Indicamos el serializador que manejará los datos de entrada y salida
    serializer_class = Events_Serializer
    # Definimos la clase de permisos; aquí todos pueden acceder (AllowAny)
    permission_classes = [AllowAny]
    
    # Sobrescribimos el método retrieve para obtener un solo evento por su ID
    def retrieve(self, request, pk=None):
        try:
            # Intentamos obtener el evento por su clave primaria (pk)
            event = events.objects.get(pk=pk)
        except events.DoesNotExist:
            # Si no existe, devolvemos un error 404 con un mensaje personalizado
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Si el evento existe, lo serializamos y devolvemos la respuesta con estado 200
        serializer = self.get_serializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST: Profesores, administradores y GUI pueden crear nuevos eventos
    def create(self, request):
        # Serializamos los datos recibidos en el request
        serializer = self.get_serializer(data=request.data)
        # Verificamos si los datos son válidos
        if serializer.is_valid():
            # Guardamos el nuevo evento en la base de datos
            serializer.save()
            # Respondemos con los datos del evento creado y un código 201 (creado)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Si hay errores, los devolvemos con un código 400 (mala solicitud)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT: Profesores, administradores y GUI pueden actualizar eventos existentes
    def update(self, request, pk=None):
        try:
            # Intentamos obtener el evento por su ID
            event = events.objects.get(pk=pk)
        except events.DoesNotExist:
            # Si no existe, devolvemos un error 404
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
    
        # Serializamos los datos de entrada y los asignamos al evento existente
        serializer = self.get_serializer(event, data=request.data)
        # Verificamos si los datos son válidos
        if serializer.is_valid():
            # Guardamos los cambios en el evento
            serializer.save()
            # Respondemos con los datos actualizados y un código 200 (éxito)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Si hay errores, los devolvemos con un código 400
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE: Profesores, administradores y GUI pueden eliminar eventos existentes
    def destroy(self, request, pk=None):
        try:
            # Intentamos obtener el evento por su ID
            event = events.objects.get(pk=pk)
            # Si el evento existe, lo eliminamos de la base de datos
            event.delete()
            # Respondemos con un mensaje de éxito y un código 204 (contenido eliminado)
            return Response({"message": "Event deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    # Deelete: Profesores, administradores y Gui
    def destroy(self, request, pk=None):
        try:
            event = events.objects.get(pk=pk)
            event.delete()
            return Response({"message": "Event deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)