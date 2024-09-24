from rest_framework import viewsets
from .models import Institution
from .serializers import Institutions_Serializer



# Create your views here.
class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = Institutions_Serializer
