from rest_framework import viewsets
from .models import staff
from .serializers import Staff_Serializer

# Create your views here.
class StaffViewSet(viewsets.ModelViewSet):
    queryset = staff.objects.all()
    serializer_class = Staff_Serializer
