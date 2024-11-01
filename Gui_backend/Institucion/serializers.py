from rest_framework import serializers
from .models import Institution
import jwt
from datetime import datetime, timedelta
from django.contrib.auth.hashers import check_password
from Api.Key import KeyJWT
class Institutions_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id','monthly_payent', 'username', 'direction', 'payment_status' , 'suscription_type', 'subscription_date','number_phone', 'email', 'imagen_url','password']
        
from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import Institution
import jwt
from datetime import datetime, timedelta

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            institution = Institution.objects.get(username=username)

            # Verificar si la contraseña es válida
            if not check_password(password, institution.password):
                raise serializers.ValidationError("Credenciales inválidas")

            # Crear el payload del JWT
            payload = {
                'id': institution.id,
                'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
                'iat': datetime.utcnow(),  # Hora de creación del token
                'institution': institution.id,
                'imgInstitution': institution.imagen_url,
                'Name': institution.username,
            }

            # Generar el token
            token = jwt.encode(payload, KeyJWT, algorithm='HS256')

            return {
                'token': token,
                'institution': institution.id,
                'imgInstitution': institution.imagen_url,
                'Name': institution.username,
            }

        except Institution.DoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas")
