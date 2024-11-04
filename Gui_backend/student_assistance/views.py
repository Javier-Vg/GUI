from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status 
from .models import student_assistance
from .serializers import StudentAssistance_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny
class StudentAssistanceViewSet(viewsets.ModelViewSet):
    queryset = student_assistance.objects.all()
    serializer_class = StudentAssistance_Serializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        #obtiene los datos, los valida a ver que sean correctos y los crea
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        #obtiene los datos de student_assitence y los obtinee
        try:
            assistance_instance = self.get_object()
        except student_assistance.DoesNotExist:
            return Response({"error": "Assistance record not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(assistance_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        #actualiza los datos por medio de la primary key
        try:
            assistance_instance = student_assistance.objects.get(pk=pk)
        except student_assistance.DoesNotExist:
            return Response({"error": "Assistance record not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(assistance_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        #metodo eliminar por medio de pk
        try:
            assistance_instance = self.get_object()
            assistance_instance.delete()
            return Response({"message": "Assistance record deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except student_assistance.DoesNotExist:
            return Response({"error": "Assistance record not found"}, status=status.HTTP_404_NOT_FOUND)
