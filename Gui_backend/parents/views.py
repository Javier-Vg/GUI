from rest_framework import viewsets
from .models import parents
from .serializers import Parents_Serializer

# Create your views here.
class ParentsViewSet(viewsets.ModelViewSet):
    queryset = parents.objects.all()
    serializer_class = Parents_Serializer
