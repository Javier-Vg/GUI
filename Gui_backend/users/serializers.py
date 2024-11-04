from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import User
from staff.models import staff  # Asegúrate de importar tu modelo Staf
from Gui.models import Admin_Gui
from Institucion.models import Institution
from students.models import students
from rest_framework_simplejwt.tokens import AccessToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_teacher', 'is_student','staff']
        
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_teacher', 'is_student','is_staff','is_superuser','staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hasheamos la contraseña automáticamente usando `create_user`
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            # Buscar usuario por email
            user = User.objects.get(email=email)
            if not check_password(password, user.password):
                raise serializers.ValidationError("Invalid password.")

            # Crear el token JWT con Simple JWT
            token = AccessToken.for_user(user)

            # Agregar información del usuario al token
            token['user_id'] = user.id
            token['email'] = user.email
            token['is_teacher'] = user.is_teacher
            token['is_student'] = user.is_student
            token['is_staff'] = user.is_staff
            token['is_superuser'] = user.is_superuser
            token['staff'] = user.staff

            # Verificar el rol del usuario y recuperar la información correspondiente
            if user.is_teacher:
                try:
                    staff_instance = staff.objects.get(email=email)
                    staff_info = {
                        "username": staff_instance.username,
                        "last_name": staff_instance.last_name,
                        "identification_number": staff_instance.identification_number,
                        "birthdate_date": str(staff_instance.birthdate_date),
                        "phone_number": staff_instance.phone_number,
                        "rol": staff_instance.position,
                        "institution": staff_instance.institution_id,
                        "imagen_url": staff_instance.imagen_url,
                        "auth": staff_instance.authorization,
                        'imgInstitution': staff_instance.imagen_url,
                        'id': staff_instance.id
                    }
                    token['info'] = staff_info
                except staff.DoesNotExist:
                    token['info'] = None
                    
            elif user.is_staff:
                try:
                    staff_instance = staff.objects.get(email=email)
                    staff_info = {
                        "username": staff_instance.username,
                        "last_name": staff_instance.last_name,
                        "identification_number": staff_instance.identification_number,
                        "birthdate_date": str(staff_instance.birthdate_date),
                        "phone_number": staff_instance.phone_number,
                        "rol": staff_instance.position,
                        "institution": staff_instance.institution_id,
                        "imagen_url": staff_instance.imagen_url,
                        "auth": staff_instance.authorization,
                        'imgInstitution': staff_instance.imagen_url,
                        'id': staff_instance.id
                    }
                    token['info'] = staff_info
                except staff.DoesNotExist:
                    token['info'] = None
            elif user.is_staff:
                try:
                    staff_instance = staff.objects.get(email=email)
                    staff_info = {
                        "username": staff_instance.username,
                        "last_name": staff_instance.last_name,
                        "identification_number": staff_instance.identification_number,
                        "birthdate_date": str(staff_instance.birthdate_date),
                        "phone_number": staff_instance.phone_number,
                        "rol": staff_instance.position,
                        "institution": staff_instance.institution_id,
                        "imagen_url": staff_instance.imagen_url,
                        "auth": staff_instance.authorization,
                        'imgInstitution': staff_instance.imagen_url,
                        'id': staff_instance.id
                    }
                    token['info'] = staff_info
                except staff.DoesNotExist:
                    token['info'] = None 
            elif user.is_superuser:
                try:
                    superuser_instance = Admin_Gui.objects.get(email=email)
                    superuser_info = {
                        "username": superuser_instance.username,
                        "email": superuser_instance.email,
                    }
                    token['info'] = superuser_info
                except Admin_Gui.DoesNotExist:
                    token['info'] = None
            elif user.staff :
                try:
                    Institution_instance = Institution.objects.get(email=email)
                    Institution_instance = {
                        "username": Institution_instance.username,
                        "email": Institution_instance.email,
                        "imgInstitution": Institution_instance.imagen_url,
                        "suscription_type": Institution_instance.suscription_type,
                        "auth": Institution_instance.authorization,
                        'institution': Institution_instance.id
                    }
                    token['info'] = Institution_instance
                except Institution.DoesNotExist:
                    token['info'] = None
            elif user.is_student:
                try:
                    student_instance = students.objects.get(email=email)
                    student_info = {
                        "username": student_instance.username,
                        "last_name": student_instance.last_name,
                        "identification_number": student_instance.identification_number,
                        "email": student_instance.email,
                        "institution": student_instance.institution_id,
                        "id": student_instance.id,
                        'imgInstitution': student_instance.imagen_url,
                        'numberIdentification': student_instance.identification_number,
                        'type_of_student': student_instance.type_of_student
                    }
                    token['info'] = student_info
                except students.DoesNotExist:
                    token['info'] = None

            data["token"] = str(token)  # Convertir el token a string

        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email.")

        return data