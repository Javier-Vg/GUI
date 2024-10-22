from rest_framework import serializers
from .models import Admin_Gui
from django.contrib.auth.hashers import check_password
import jwt
from datetime import datetime, timedelta
from Api.Key import KeyJWT
class AdminGuiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_Gui
        fields = ['id', 'username', 'email', 'password', 'rol', 'fecha_creacion']
        
TOKEN_EXPIRATION_TIME = 5  # El tiempo de expiración del token

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            admin_gui = Admin_Gui.objects.get(username=username)

            # Verificar si la contraseña es válida
            if not check_password(password, admin_gui.password):
                raise serializers.ValidationError("Credenciales inválidas")

            # Crear el payload del JWT
            payload = {
                'id': admin_gui.id,
                'username': admin_gui.username,
                'email': admin_gui.email,
                'rol': admin_gui.rol,
                'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION_TIME)  # Expiración del token
            }

            # Generar el token
            token = jwt.encode(payload, KeyJWT, algorithm='HS256')

            return {
                'token': token,
                'rol': admin_gui.rol,
            }

        except Admin_Gui.DoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas")