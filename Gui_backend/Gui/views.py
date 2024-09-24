from rest_framework import viewsets
from .models import Admin_Gui
from .serializers import AdminGuiSerializer

class AdminGuiViewSet(viewsets.ModelViewSet):
    queryset = Admin_Gui.objects.all()
    serializer_class = AdminGuiSerializer
