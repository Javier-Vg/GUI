from rest_framework import viewsets
from .models import students
from .serializers import Students_Serializer

# Create your views here.
class StudentsViewSet(viewsets.ModelViewSet):
    queryset = students.objects.all()
    serializer_class = Students_Serializer
