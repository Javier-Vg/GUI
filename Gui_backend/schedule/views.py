from rest_framework import viewsets
from .models import schedule
from .serializers import Schedule_Serializer

# Create your views here.
class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = schedule.objects.all()
    serializer_class = Schedule_Serializer
