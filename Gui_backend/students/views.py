from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import students
from rest_framework.decorators import api_view
from .serializers import Students_Serializer
import jwt
from django.contrib.auth.hashers import check_password
from datetime import datetime, timedelta

class StudentsViewSet(viewsets.ModelViewSet):
    queryset = students.objects.all()
    serializer_class = Students_Serializer

    def update(self, request, pk=None):
        try:
            institution = students.objects.get(pk=pk)
        except students.DoesNotExist:
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
        # Buscar el estudiante por el username
        student = students.objects.get(username=username)

        # Verificar la contraseña hasheada
        if check_password(password, student.password):
            # Generar el payload para el JWT
            payload = {
                'id': student.id,
                'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
                'iat': datetime.utcnow(),  # Hora de creación del token
            }

            # Generar el JWT usando PyJWT
            encoded = jwt.encode(payload, "asd", algorithm='HS256')

            # Retornar el token y el ID del estudiante e institución
            return Response({
                'token': encoded,
                'estudiante': student.id,
                'institution': student.institution.id if student.institution else None  # Verificar si el estudiante tiene una institución
            })
        else:
            return Response({'error': 'Credenciales inválidas'}, status=400)
    except students.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=400)
