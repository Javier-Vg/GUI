from permissions import IsAuthenticatedWithCookieStaff
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import Staff_Serializer
from .serializers import LoginSerializer
from rest_framework import viewsets
from .models import staff

class StaffViewSet(viewsets.ModelViewSet):
    queryset = staff.objects.all()
    serializer_class = Staff_Serializer
    # permission_classes = [IsAuthenticatedWithCookieStaff]

    def update(self, request, *args, **kwargs):
        # Obtiene el objeto staff a actualizar
        partial = kwargs.pop('partial', False)  # Si se quiere hacer un update parcial
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)  # Valida los datos
        self.perform_update(serializer)  # Actualiza el objeto

        return Response(serializer.data, status=status.HTTP_200_OK)  
@api_view(['POST'])
def LoginView(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        # Retorna los datos del serializer (incluyendo el token JWT)
        return Response(serializer.validated_data, status=200)
    else:
        # Retorna los errores si la validación falla
        return Response(serializer.errors, status=400)

# @api_view(['POST'])
# def LoginView(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     try:
#         # Buscar el miembro del staff por el username
#         staff_member = staff.objects.get(username=username)

#         # Verificar la contraseña hasheada
#         if check_password(password, staff_member.password):
#             # Generar el payload para el JWT
#             payload = {
#                 'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
#                 'iat': datetime.utcnow(),  # Hora de creación del token
#                 'username': staff_member.username,
#                 'id': staff_member.id,
#                 'institution_id': staff_member.institution.id,
#             }
#             # Generar el JWT usando PyJWT
#             encoded = jwt.encode(payload, KeyJWT, algorithm='HS256')
# # Crear la respuesta JSON correctamente
#             return Response({
#                 'token': encoded,
#                 'message': 'Login exitoso',
#                 'ID':staff_member.id,
#                 'institution': staff_member.institution.id,
#                 'Name': staff_member.username,
#                 'imgInstitution': staff_member.imagen_url,
#                 'rol': staff_member.position, 
#                 'auth': staff_member.authorization
#             })
        
#         else:
#             return Response({'error': 'Credenciales inválidas'}, status=400)

#     except staff.DoesNotExist:
#         return Response({'error': 'Credenciales inválidas'}, status=400)
