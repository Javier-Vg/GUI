from rest_framework import viewsets
from .models import staff
from .serializers import Staff_Serializer
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from datetime import datetime, timedelta
import jwt
from rest_framework.response import Response

# Create your views here.
class StaffViewSet(viewsets.ModelViewSet):
    queryset = staff.objects.all()
    serializer_class = Staff_Serializer


@api_view(['POST'])
def LoginView(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        # Buscar la institución por el username
        staff_member = staff.objects.get(username=username)  # Asegúrate de usar el nombre correcto del modelo

        # Verificar la contraseña hasheada
        if check_password(password, staff_member.password):
            # Generar el payload para el JWT
            payload = {
                'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
                'iat': datetime.utcnow(),  # Hora de creación del token
                'username': staff_member.username,
                'institution_id': staff_member.institution.id,  # Incluye el ID de la institución
            }

            # # Generar el JWT usando PyJWT
            encoded = jwt.encode(payload, "asd", algorithm='HS256')

            # # Retornar el token y el ID de la institución
            return Response({'token': encoded, 'institution': staff_member.institution.id})
        else:
            return Response({'error': 'Credenciales inválidas'}, status=400)
    except staff.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=400)
    