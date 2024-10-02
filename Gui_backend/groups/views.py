from rest_framework import viewsets
from .models import group
from .serializers import Groups_Serializer

# Create your views here.
class GroupsViewSet(viewsets.ModelViewSet):
    queryset = group.objects.all()
    serializer_class = Groups_Serializer
