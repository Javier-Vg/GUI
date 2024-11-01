from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from .serializers import UserCreateSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
# from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.all()  # Los administradores ven todos los usuarios
        return User.objects.filter(id=user.id)  # Los usuarios normales ven solo su propio perfil
    


class UserCreateView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Verificar si la contraseña está en el request
        password = request.data.get('password')
        
        if not password:
            raise ValidationError("La contraseña no fue proporcionada en el request.")

        # Lanzar un error personalizado que incluya la contraseña para propósitos de prueba


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    

# @api_view(["POST"])
# @permission_classes([AllowAny])
# def login_view(request):
#     serializer = LoginSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)

#     # Accede a los datos validados (incluyendo el user_id, etc.)
#     response_data = {
#         "message": "Login successful",
#         "token": serializer.validated_data["token"],
#     }

#     # Solo añade información de staff si existe
#     if "staff_info" in serializer.validated_data:
#         response_data["staff_info"] = serializer.validated_data["staff_info"]

#     return Response(response_data, status=status.HTTP_200_OK)
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Accede a los datos validados (incluyendo el token con la información de usuario)
    response_data = {
        "message": "Login successful",
        "token": serializer.validated_data["token"],
    }

    # Añadir la información de usuario directamente desde el token
    if "info" in serializer.validated_data["token"]:
        response_data["user_info"] = serializer.validated_data["token"]["info"]

    return Response(response_data, status=status.HTTP_200_OK)