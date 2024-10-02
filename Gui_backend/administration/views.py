from rest_framework import viewsets
from .models import administration
from .serializers import Administration_Serializer

# Create your views here.
class Administration_ViewSet(viewsets.ModelViewSet):
    queryset = administration.objects.all()
    serializer_class = Administration_Serializer