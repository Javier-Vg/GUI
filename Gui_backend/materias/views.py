from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import subjects
from .serializers import Subjects_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny
class SubjectsViewSet(viewsets.ModelViewSet):
    queryset = subjects.objects.all()
    serializer_class = Subjects_Serializer
    permission_classes = [IsAuthenticated]
    
    #Institutions
    def create(self, request):
        name = request.data.get('name')

        if subjects.objects.filter(name=name).exists():
            return Response({"success": False, "message": "Subject with this name already exists"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #Los 4
    def retrieve(self, request, pk=None):
        try:
            subject = self.get_object()
        except subjects.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(subject)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #metodo update por medio de la pk
    def update(self, request, pk=None):
        try:
            subject = subjects.objects.get(pk=pk)
        except subjects.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #metodo destroy por medio de la pk
    def destroy(self, request, pk=None):
        try:
            subject = self.get_object()
            subject.delete()
            return Response({"message": "Subject deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except subjects.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
