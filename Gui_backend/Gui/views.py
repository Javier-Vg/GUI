from django.db import models
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
from .models import Admin_Gui
from .serializers import AdminGuiSerializer
from rest_framework.decorators import action
from django.contrib.auth import authenticate

class AdminGuiViewSet(viewsets.ModelViewSet):
    queryset = Admin_Gui.objects.all()
    serializer_class = AdminGuiSerializer
    permission_classes = []

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
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username, password)
        # Autenticación de usuario
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({"success": True}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials", "success": False}, status=status.HTTP_401_UNAUTHORIZED)
