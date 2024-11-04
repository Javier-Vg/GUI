from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status 
from .models import events
from .serializers import Events_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny
import jwt
class EventsViewSet(viewsets.ModelViewSet):
    queryset = events.objects.all()
    serializer_class = Events_Serializer
    permission_classes = [AllowAny]
    
    
    def retrieve(self, request, pk=None):
        try:
            event = events.objects.get(pk=pk)
        except events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST: Profesores, administradores y Gui
    def create(self, request):
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # put: Profesores, administradores y Gui
    def update(self, request, pk=None):
        try:
            event = events.objects.get(pk=pk)
        except events.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = self.get_serializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Deelete: Profesores, administradores y Gui
    def destroy(self, request, pk=None):
        try:
            event = events.objects.get(pk=pk)
            event.delete()
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