from rest_framework import viewsets
from .models import subjects
from .serializers import Subjects_Serializer

# Create your views here.
class SubjectsViewSet(viewsets.ModelViewSet):
    queryset = subjects.objects.all()
    serializer_class = Subjects_Serializer
