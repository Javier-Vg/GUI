from rest_framework import serializers
from .models import Admin_Gui

class AdminGuiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_Gui
        fields = ['id', 'nombre', 'email', 'password', 'rol', 'fecha_creacion']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Aquí puedes agregar el hash de la contraseña
        # Por ejemplo usando make_password
        from django.contrib.auth.hashers import make_password
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
