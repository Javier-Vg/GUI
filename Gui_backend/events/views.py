from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status 
from .models import events
from .serializers import Events_Serializer

class EventsViewSet(viewsets.ModelViewSet):
    queryset = events.objects.all()
    serializer_class = Events_Serializer

    def update(self, request, pk=None):
        try:
            institution = events.objects.get(pk=pk)
        except events.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)