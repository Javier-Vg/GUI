from rest_framework import viewsets
from .models import payments
from .serializers import Payments_Serializer

# Create your views here.
class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = payments.objects.all()
    serializer_class = Payments_Serializer
