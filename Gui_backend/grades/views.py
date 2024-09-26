from rest_framework import viewsets
from .models import grades
from .serializers import Grades_Serializer

# Create your views here.
class GroupsViewSet(viewsets.ModelViewSet):
    queryset = grades.objects.all()
    serializer_class = Grades_Serializer