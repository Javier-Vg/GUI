from django.db import models
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Admin_Gui
from .serializers import AdminGuiSerializer
from django.contrib.auth.hashers import make_password

import jwt
from datetime import datetime, timedelta

class AdminGuiViewSet(viewsets.ModelViewSet):
    queryset = Admin_Gui.objects.all()
    serializer_class = AdminGuiSerializer
    permission_classes = []
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
         try:
                # Hashear la contraseña antes de guardar
                serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
                serializer.save()
                return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
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

from django.contrib.auth.hashers import check_password
TOKEN_EXPIRATION_TIME = 24

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        # Validar credenciales con el modelo `Admin_Gui`
        admin_gui = Admin_Gui.objects.get(username=username)
        
        # Verificar si la contraseña ingresada coincide con la hasheada
        if check_password(password, admin_gui.password):
            payload = {
                'id': admin_gui.id,
                'username': admin_gui.username,
                'email': admin_gui.email,
                'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION_TIME)  # Expiración en 24 horas
            }
            token = jwt.encode(payload, "tokenmiedo", algorithm='HS256')

            return Response({'success': True,'token': token}, status=status.HTTP_200_OK)
        else:
            return Response({'success': False, 'message': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)
            
    except Admin_Gui.DoesNotExist:
        return Response({'success': False, 'message': 'error en el sistema'}, status=status.HTTP_400_BAD_REQUEST)






