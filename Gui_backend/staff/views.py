from rest_framework import viewsets
from .models import staff
from .serializers import Staff_Serializer
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from datetime import datetime, timedelta
import jwt
from rest_framework.response import Response

# Create your views here.
class StaffViewSet(viewsets.ModelViewSet):
    queryset = staff.objects.all()
    serializer_class = Staff_Serializer

@api_view(['POST'])
def LoginView(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    try:
        Staff = staff.objects.get(username=username)
        
        if check_password(password, Staff.password):
            payload = {
                'idInst': Staff.institution,
                'username': Staff.username,
                'email': Staff.email,
                'role': Staff.position,
                'exp' : datetime.utcnow() + timedelta(hours=24),
                'ait': datetime.utcnow(),              
            }
            encode = jwt.encode(payload, 'asd', algorithm='HS256')
            return Response({f"token": encode, "institution": Staff.institution})
        else: 
            return Response({"error": "Credencials Invalidas"})
    except staff.DoesNotExist:
        return Response({"error": "Credenciales Invalidas"})