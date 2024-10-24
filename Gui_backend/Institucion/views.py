from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from .models import Institution
from .serializers import Institutions_Serializer, LoginSerializer
# from permissions import IsAuthenticatedWithCookie

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = Institutions_Serializer
    # permission_classes = [IsAuthenticatedWithCookie]

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'destroy']:
    #         # Para 'create', 'update', 'destroy' se requiere autenticación
    #         self.permission_classes = [IsAuthenticatedWithCookie]
    #     # else:
    #     #     # Para 'retrieve', se permiten todas las peticiones
    #     #     # self.permission_classes = []  # Sin restricciones de permisos
    #     #     return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            institution = self.get_object()
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        try:
            institution = self.get_object()
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            institution = self.get_object()
            institution.delete()
            return Response({"message": "Institution deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Institution.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
def LoginView(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        return Response(serializer.validated_data)
    else:
        return Response(serializer.errors, status=400)  
    