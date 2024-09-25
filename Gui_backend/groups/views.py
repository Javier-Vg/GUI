from rest_framework import viewsets
from .models import groups
from .serializers import Groups_Serializer

# Create your views here.
class GroupsViewSet(viewsets.ModelViewSet):
    queryset = groups.objects.all()
    serializer_class = Groups_Serializer
