from rest_framework import viewsets
from .models import contracts
from .serializers import Contracts_Serializer

# Create your views here.
class Contracts_ViewSet(viewsets.ModelViewSet):
    queryset = contracts.objects.all()
    serializer_class = Contracts_Serializer