from rest_framework import viewsets
from .models import teaching_assistance
from .serializers import TeachingAssistance_Serializer

# Create your views here.
class TeachingAssistanceViewSet(viewsets.ModelViewSet):
    queryset = teaching_assistance.objects.all()
    serializer_class = TeachingAssistance_Serializer