from rest_framework import viewsets
from .models import teachers
from .serializers import Teachers_Serializer

# Create your views here.
class TeachersViewSet(viewsets.ModelViewSet):
    queryset = teachers.objects.all()
    serializer_class = Teachers_Serializer
