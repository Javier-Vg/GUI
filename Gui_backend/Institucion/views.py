from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from .models import Institution
from .serializers import Institutions_Serializer
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from django.contrib.auth.hashers import check_password
# import python_jwt as jwt, jwcrypto.jwk as jwk, datetime
# import mysql.connector

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = Institutions_Serializer

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
    
@api_view(['POST'])
def LoginView(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        # Buscar la institución por el username
        institution = Institution.objects.get(username=username)

        # Verificar la contraseña hasheada
        if check_password(password, institution.password):
            # Generar el payload para el JWT
            payload = {
                'id': institution.id,
                'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
                'iat': datetime.utcnow(),  # Hora de creación del token
            }

            # Generar el JWT usando PyJWT
            encoded = jwt.encode(payload, "asd", algorithm='HS256')

            # Retornar el token y el ID de la institución
            return Response({'token': encoded, 'institution': institution.id})
        else:
            return Response({'error': 'Credenciales inválidas'}, status=400)
    except Institution.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=400)
    