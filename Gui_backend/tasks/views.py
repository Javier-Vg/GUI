from rest_framework import viewsets
from .models import tasks
from .serializers import Tasks_Serializer

# Create your views here.
class TasksViewSet(viewsets.ModelViewSet):
    queryset = tasks.objects.all()
    serializer_class = Tasks_Serializer
