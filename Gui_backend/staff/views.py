
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import Staff_Serializer
from .serializers import LoginSerializer
from rest_framework import viewsets
from .models import staff
from users.serializers import UserCreateSerializer
from users.models import User
# from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError

class StaffViewSet(viewsets.ModelViewSet):
    queryset = staff.objects.all()
    serializer_class = Staff_Serializer
    permission_classes = [IsAuthenticated]  
    def create(self, request, *args, **kwargs):
    # Extraemos los datos de usuario desde el request
        position = request.data.get('position')

        # Preparamos los datos del usuario
        user_data = {
            'username': request.data['username'],
            'password': request.data['password'],
            'email': request.data['email'],
        }

        # Establecer is_staff según la posición
        if position != "Teacher":
            user_data.update({
                'is_staff': True,
                'is_student': False,
                'is_teacher': False
            })
        else:
            user_data.update({
                'is_staff': False,
                'is_student': False,
                'is_teacher': True
            })

        # Crear el usuario
        user_serializer = UserCreateSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()  # Guardamos y obtenemos la instancia de User

        # Ahora creamos el perfil de Staff
        staff_data = request.data.copy()
        staff_data['user'] = user.id  # Asignamos la relación a User
        serializer = self.get_serializer(data=staff_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        staff_instances = staff.objects.all()  # Obtener todos los objetos

        if not staff_instances.exists():
            return Response({"error": "No staff found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(staff_instances, many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        try:
            staff_instance = self.get_object()
            staff_instance.delete()
            return Response({"message": "Staff deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def LoginView(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        return Response(serializer.validated_data, status=200)
    # else:
    #     return Response(serializer.errors, status=400)


# from rest_framework_simplejwt.views import TokenObtainPairView
# class CustomTokenObtainPairView(TokenObtainPairView):
#     permission_classes = [AllowAny]  # Permitir acceso sin autenticación
#     serializer_class = CustomTokenObtainPairSerializer


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def LoginView(request):
#     serializer = LoginSerializer(data=request.data)

#     if serializer.is_valid():
#         # Retorna los datos del serializer (incluyendo el token JWT)
#         return Response(serializer.validated_data, status=200)
#     else:
#         # Retorna los errores si la validación falla
#         return Response(serializer.errors, status=400)