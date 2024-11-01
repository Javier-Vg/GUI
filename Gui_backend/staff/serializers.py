from rest_framework import serializers
from .models import staff
from django.contrib.auth.hashers import check_password
from datetime import datetime, timedelta
from Api.Key import KeyJWT
import jwt

class Staff_Serializer(serializers.ModelSerializer):
    class Meta:
        model = staff
        fields = ['id','username', 'last_name', 'identification_number' ,'birthdate_date',"password", 'direction', 'phone_number', 'email', 'employment_status', 'position' , 'institution', 'contract', 'schedule', 'imagen_url', 'authorization']
        

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        try:
            # Buscar al miembro del staff por el username
            staff_member = staff.objects.get(username=username)
            
            # Verificar la contraseña hasheada
            if check_password(password, staff_member.password):
                # Generar el payload para el JWT
                payload = {
                    'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
                    'iat': datetime.utcnow(),  # Hora de creación del token
                    'Name': staff_member.username,
                    'ID': staff_member.id,
                    'institution': staff_member.institution.id,
                    'imgInstitution': staff_member.imagen_url,
                    'rol': staff_member.position, 
                    'auth': staff_member.authorization
                }
                # Generar el JWT usando PyJWT
                token = jwt.encode(payload, KeyJWT, algorithm='HS256')

                # Retornar la data relevante incluyendo el token
                return {
                    'token': token,
                    'ID': staff_member.id,
                    'institution': staff_member.institution.id,
                    'Name': staff_member.username,
                    'imgInstitution': staff_member.imagen_url,
                    'rol': staff_member.position, 
                    'auth': staff_member.authorization
                }
            else:
                raise serializers.ValidationError('Credenciales inválidas')
        
        except staff.DoesNotExist:
            raise serializers.ValidationError('Credenciales inválidas')
        


# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework import serializers
# # from django.contrib.auth import authenticate
# from .models import staff
# from rest_framework.response import Response
# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     username = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     def validate(self, data):
#         username = data.get('username')
#         password = data.get('password')

#         # Intenta encontrar al usuario en la tabla `staff`
#         try:
#             user = staff.objects.get(username=username)  # Busca el usuario por su nombre de usuario
#         except staff.DoesNotExist:
#             raise serializers.ValidationError("Usuario no encontrado.")

#         # Verifica la contraseña
#         if not check_password(password, user.password):
#             raise serializers.ValidationError("Contraseña inválida.")

#         # Genera un token JWT usando SimpleJWT
#         refresh = self.get_token(user)

#         # Retorna un diccionario con el token y la información del usuario
#         return {
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         }

#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Agrega campos personalizados al payload del token
#         token['ID'] = user.id
#         token['institution'] = user.institution.id
#         token['Name'] = user.username
#         token['imgInstitution'] = user.imagen_url
#         token['rol'] = user.position
#         token['auth'] = user.authorization 

#         return token
    
# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(write_only=True)

#     def validate(self, attrs):
#         username = attrs.get('username')
#         password = attrs.get('password')

#         # Intenta encontrar al usuario en la tabla `staff`
#         try:
#             user = staff.objects.get(username=username)  # Busca el usuario por su nombre de usuario
#         except staff.DoesNotExist:
#             msg = 'No se puede iniciar sesión con las credenciales proporcionadas.'
#             raise serializers.ValidationError(msg, code='authorization')

#         # Verifica la contraseña
#         if not check_password(password, user.password):
#             msg = 'No se puede iniciar sesión con las credenciales proporcionadas.'
#             raise serializers.ValidationError(msg, code='authorization')

#         # Llama a la validación base para generar el refresh y access tokens
#         data = super().validate(attrs)
#         refresh = self.get_token(user)

#         # Agrega los tokens a la respuesta
#         data['refresh'] = str(refresh)
#         data['access'] = str(refresh.access_token)

#         # Agrega datos del usuario al token
#         data['staff'] = {
#             "id": user.id,
#             "username": user.username,
#             "institution": user.institution.id,
#             "imgInstitution": user.imagen_url,
#             "rol": user.position,
#             "auth": user.authorization,
#         }

#         self.user = user  # Guarda el usuario en la instancia
#         return data

#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Agrega campos personalizados al payload del token
#         token['id'] = user.id
#         token['username'] = user.username
#         token['institution'] = user.institution.id
#         token['imgInstitution'] = user.imagen_url
#         token['rol'] = user.position
#         token['auth'] = user.authorization

#         return token