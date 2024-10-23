from rest_framework import serializers
from .models import students
from django.contrib.auth.hashers import check_password
import jwt
from datetime import datetime, timedelta
from Api.Key import KeyJWT
class Students_Serializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = ['password','institution','id','username', 'last_name', 'identification_number' ,'birthdate_date', 'grade', 'academic_status', 'allergy_information', 'contact_information','imagen_url','email','guardian_phone_number','name_guardian', 'monthly_payent_students','type_of_student', 'group']
        
class StudentLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            student = students.objects.get(username=username)

            # Verificar si la contraseña es válida
            if not check_password(password, student.password):
                raise serializers.ValidationError("Credenciales inválidas")

            # Crear el payload del JWT
            payload = {
                'id': student.id,
                'exp': datetime.utcnow() + timedelta(hours=24),  # Expira en 24 horas
                'iat': datetime.utcnow(),  # Hora de creación del token
                'type_of_student': student.type_of_student
            }

            # Generar el token
            token = jwt.encode(payload, KeyJWT, algorithm='HS256')

            return {
                'token': token,
            }

        except students.DoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas")        