
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Admin_Gui
from .serializers import AdminGuiSerializer
from django.contrib.auth.hashers import make_password
from .serializers import AdminLoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from users.serializers import UserCreateSerializer

class AdminGuiViewSet(viewsets.ModelViewSet):
    queryset = Admin_Gui.objects.all()
    serializer_class = AdminGuiSerializer
    permission_classes = [AllowAny]
    #Gui
    def create(self, request, *args, **kwargs):
        # Verificar si la contraseña está en el request
        password = request.data.get('password')
        if not password:
            raise ValidationError("La contraseña no fue proporcionada en el request.")

        # Crear el usuario
        user_data = {
            'username': request.data['username'],
            'email': request.data['email'],
            'password': password,
            'is_staff': False,
            'is_student': False,
            'is_superuser': True,  # Esto es según tu requerimiento
        }

        # Crear el usuario
        user_serializer = UserCreateSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Ahora crear el estudiante
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Aquí se asocia la contraseña
            try:
                serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
                serializer.save()  # Guardamos el estudiante
                return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Gui
    def retrieve(self, request, pk=None):
        try:
            admin = self.get_object()
        except Admin_Gui.DoesNotExist:
            return Response({"error": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(admin)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #Gui
    #Gui
    def retrieve(self, request, pk=None):
        try:
            admin = self.get_object()
        except Admin_Gui.DoesNotExist:
            return Response({"error": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(admin)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #Gui
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
    
    #Gui
    def destroy(self, request, pk=None):
        try:
            admin = self.get_object()
            admin.delete()
            return Response({"message": "Admin deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Admin_Gui.DoesNotExist:
            return Response({"error": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            admin = self.get_object()
            admin.delete()
            return Response({"message": "Admin deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Admin_Gui.DoesNotExist:
            return Response({"error": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)
  

@api_view(['POST'])
def login(request):
    serializer = AdminLoginSerializer(data=request.data)
    
    if serializer.is_valid():
        return Response({'success': True, **serializer.validated_data}, status=status.HTTP_200_OK)
    else:
        return Response({'success': False, 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
