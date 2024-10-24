from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import students
from rest_framework.decorators import api_view
from .serializers import Students_Serializer
import jwt
from django.contrib.auth.hashers import check_password
from datetime import datetime, timedelta
from Api.Key import KeyJWT

# from permissions import IsAuthenticatedWithCookie

class StudentsViewSet(viewsets.ModelViewSet):
    queryset = students.objects.all()
    serializer_class = Students_Serializer
    # permission_classes = [IsAuthenticatedWithCookie]
    #Institutions y Gui
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#los 4
    def retrieve(self, request, pk=None):
        try:
            student_instance = self.get_object()
        except students.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(student_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

#Institutions y GUi
    def update(self, request, pk=None):
        try:
            student_instance = students.objects.get(pk=pk)
        except students.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(student_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Institutions y GUi
    def destroy(self, request, pk=None):
        try:
            student_instance = self.get_object()
            student_instance.delete()
            return Response({"message": "Student deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except students.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = students.objects.all()
    # serializer_class = Students_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = students.objects.get(pk=pk)
    #     except students.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .serializers import StudentLoginSerializer

@api_view(['POST'])
def LoginView(request):
    serializer = StudentLoginSerializer(data=request.data)
    
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
#         Students = students.objects.get(username=username)

#         # Verificar la contraseña hasheada
#         if check_password(password, Students.password):
#             # Generar el payload para el JWT
#             payload = {
#                 'id': Students.id,
#                 'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
#                 'iat': datetime.utcnow(),  # Hora de creación del token
#             }

#             # Generar el JWT usando PyJWT
#             encoded = jwt.encode(payload,KeyJWT, algorithm='HS256')

#             # Retornar el token y el ID de la institución
#             return Response({
#                 'token': encoded,
#                 'StudentID': Students.id,
#                 'institution': Students.institution_id,
#                 "imgInstitution": Students.imagen_url,
#                 "Name": Students.username
#             })
#         else:
#             return Response({'error': 'Credenciales inválidas'}, status=400)
#     except students.DoesNotExist:
#         return Response({'error': 'Credenciales inválidas'}, status=400)
