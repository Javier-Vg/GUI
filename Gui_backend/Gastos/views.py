from rest_framework import viewsets
from .models import Gasto
from .serializers import GastosSerializer
# Create your views here.
class GastoCreateView(viewsets.ModelViewSet):
    queryset = Gasto.objects.all()
    serializer_class = GastosSerializer