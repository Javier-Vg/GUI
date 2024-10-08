from django.db import models
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Admin_Gui
from .serializers import AdminGuiSerializer
from rest_framework.decorators import action

class AdminGuiViewSet(viewsets.ModelViewSet):
    queryset = Admin_Gui.objects.all()
    serializer_class = AdminGuiSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication] 

    def create(self, request, *args, **kwargs):    
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        
        try:
            admin = self.get_object()
        except Admin_Gui.DoesNotExist:
            return Response({"error": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(admin, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)