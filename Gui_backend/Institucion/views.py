from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from .models import Institution
from .serializers import Institutions_Serializer, LoginSerializer
from datetime import datetime, timedelta
from django.conf import settings
import jwt
# from permissions import IsAuthenticatedWithCookieGui
from django.contrib.auth.hashers import check_password
from Api.Key import KeyJWT

class InstitutionViewSet(viewsets.ModelViewSet):
    
    queryset = Institution.objects.all()
    serializer_class = Institutions_Serializer
    # permission_classes = [IsAuthenticatedWithCookieGui]
    
    #Gui
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Los 4
    def retrieve(self, request, pk=None):
        try:
            institution = self.get_object()
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Gui
    def update(self, request, pk=None):
        try:
            institution = Institution.objects.get(pk=pk)
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #GUI
    def destroy(self, request, pk=None):
        try:
            institution = self.get_object()
            institution.delete()
            return Response({"message": "Institution deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = Institution.objects.all()
    # serializer_class = Institutions_Serializer
    # # permission_classes = [IsAuthenticatedWithCookieGui]

    # def update(self, request, pk=None):
    #     try:
    #         institution = Institution.objects.get(pk=pk)
    #     except Institution.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  

@api_view(['POST'])
def LoginView(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        return Response(serializer.validated_data)
    else:
        return Response(serializer.errors, status=400)  
    
# @api_view(['POST'])
# def LoginView(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     try:
#         # Buscar la institución por el username
#         institution = Institution.objects.get(username=username)

#         # Verificar la contraseña hasheada
#         if check_password(password, institution.password):
#             # Generar el payload para el JWT
#             payload = {
#                 'id': institution.id,
#                 'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
#                 'iat': datetime.utcnow(),  # Hora de creación del token
#             }

#             # Generar el JWT usando PyJWT
#             encoded = jwt.encode(payload, KeyJWT , algorithm='HS256')
            
#             # Retornar el token y el ID de la institución
#             return Response({'token': encoded, 'institution': institution.id, "imgInstitution": institution.imagen_url, "Name": institution.username})
#         else:
#             return Response({'error': 'Credenciales inválidas'}, status=400)
#     except Institution.DoesNotExist:
#         return Response({'error': 'Credenciales inválidas'}, status=400)
