
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
    permission_classes = [AllowAny]  
    def create(self, request, *args, **kwargs):
    # Extraemos los datos de usuario desde el request
        position = request.data.get('position')

        # Preparamos los datos del usuario
        user_data = {
            'username': request.data.get('username'),
            'password': request.data.get('password'),
            'email': request.data.get('email'),
        }

        # Establecer is_staff según la posición
        # dependiendo el rol que se le seleccione en el frontend se le decide 
        #si is_staff es true o si is_teacher is True
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
        try:
            staff_instance = self.get_object()  # Utiliza el método get_object de ModelViewSet
            serializer = self.get_serializer(staff_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        staff_instance = self.get_object()
        
        # Obtener el email de la instancia de Staff antes de actualizarla
        email = staff_instance.email

        # Crear el serializer con los datos nuevos
        serializer = self.get_serializer(staff_instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Actualizar el usuario asociado en la tabla User, si existe y si el email no cambia
        user = User.objects.filter(email=email).first()
        if user:
            # Actualizar los datos en User si vienen en el request
            user_fields = ['username', 'password', 'email']  # Campos relevantes de User que quieras actualizar
            for field in user_fields:
                if field in request.data:
                    setattr(user, field, request.data[field])
            user.save()  # Guarda los cambios en User

        return Response(serializer.data, status=status.HTTP_200_OK)
    def destroy(self, request, pk=None):
        try:
            # Obtener la instancia de Staff
            staff_instance = self.get_object()

            # Obtener el email de la instancia de Staff
            email = staff_instance.email

            # Buscar y eliminar el usuario con el mismo email, si existe
            user = User.objects.filter(email=email).first()
            if user:
                user.delete()  # Elimina el usuario asociado

            # Eliminar la instancia de Staff
            staff_instance.delete()
            return Response({"message": "Staff and associated user deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        except staff.DoesNotExist:
            return Response({"error": "Staff not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def LoginView(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        return Response(serializer.validated_data, status=200)
