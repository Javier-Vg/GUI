from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from .models import Institution
from .serializers import Institutions_Serializer, LoginSerializer
from users.serializers import UserCreateSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.models import User
class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = Institutions_Serializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Extraer la contraseña del request
        password = request.data.get('password')
        if not password:
            raise ValidationError("La contraseña no fue proporcionada en el request.")

        # Crear el usuario
        #cuando se crea un institucion se traen los datos mas relevantes para enviarse a la tabla de users
        
        user_data = {
            'username': request.data.get('username'),
            'email': request.data.get('email'),
            'password': password,
            'staff': True,
        }
        
        user_serializer = UserCreateSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()  # Guardamos el usuario y obtenemos la instancia

        # Crear el estudiante
        student_data = request.data.copy()  # Copiamos los datos del request para incluir el usuario
        student_data['user'] = user.id  # Asociamos el usuario creado al estudiante

        serializer = self.get_serializer(data=student_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Guardamos el estudiante

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def retrieve(self, request, pk=None):
        try:
            institution = self.get_object()
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None): 
        try:
            institution = self.get_object()  # Obtener la instancia de Institution
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        email = institution.email  # Guardar el email de la institución antes de actualizar

        serializer = self.get_serializer(institution, data=request.data)
        if serializer.is_valid():
            serializer.save()  # Actualizar la institución

            # Actualizar el usuario asociado en la tabla User, si existe
            user = User.objects.filter(email=email).first()
            if user:
                # Actualizar los datos en User si vienen en el request
                user_fields = ['username', 'password', 'email']  # Campos relevantes de User que quieras actualizar
                for field in user_fields:
                    if field in request.data:
                        setattr(user, field, request.data[field])
                user.save()  # Guardar los cambios en User

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            institution = self.get_object()

            # Obtén el email de la institución
            email = institution.email

            # Busca y elimina al usuario con el mismo email, si existe
            user = User.objects.filter(email=email).first()
            if user:
                user.delete()  # Elimina el usuario asociado

            # Elimina la institución
            institution.delete()
            return Response({"message": "Institution and associated user deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
def LoginView(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        return Response(serializer.validated_data)
    else:
        return Response(serializer.errors, status=400)  
    
    