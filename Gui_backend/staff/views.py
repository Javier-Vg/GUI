from rest_framework import viewsets
from .models import staff
from .serializers import Staff_Serializer
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from datetime import datetime, timedelta
import jwt
from rest_framework.response import Response
from Api.Key import KeyJWT
from django.http import JsonResponse

class StaffViewSet(viewsets.ModelViewSet):
    queryset = staff.objects.all()
    serializer_class = Staff_Serializer

@api_view(['POST'])
def LoginView(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        # Buscar el miembro del staff por el username
        staff_member = staff.objects.get(username=username)

        # Verificar la contraseña hasheada
        if check_password(password, staff_member.password):
            # Generar el payload para el JWT
            payload = {
                'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
                'iat': datetime.utcnow(),  # Hora de creación del token
                'username': staff_member.username,
                'institution_id': staff_member.institution.id,
            }
            # Generar el JWT usando PyJWT
            encoded = jwt.encode(payload, KeyJWT, algorithm='HS256')
# Crear la respuesta JSON correctamente
            return Response({
                'token': encoded,
                'message': 'Login exitoso',
                'institution': staff_member.institution.id,
                'Name': staff_member.username,
                'imgInstitution': staff_member.imagen_url,
                'rol': staff_member.position, 
                'auth': staff_member.authorization
            })
        
        else:
            return Response({'error': 'Credenciales inválidas'}, status=400)

    except staff.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=400)
