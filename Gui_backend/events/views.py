from rest_framework import viewsets
from .models import events
from .serializers import Events_Serializer

# Create your views here.
class EventsViewSet(viewsets.ModelViewSet):
    queryset = events.objects.all()
    serializer_class = Events_Serializer