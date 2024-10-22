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
                    'Name': staff_member.username,
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