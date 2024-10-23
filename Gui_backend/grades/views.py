from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import grades
from .serializers import Grades_Serializer
# from permissions import IsAuthenticatedWithCookieDirectors, IsAuthenticatedWithCookieStaff, IsAuthenticatedWithCookieGui

class GroupsViewSet(viewsets.ModelViewSet):
    queryset = grades.objects.all()
    serializer_class = Grades_Serializer

    #Profesores, estudiante y istitutiones
    def retrieve(self, request, pk=None):
        try:
            grupo = grades.objects.get(pk=pk)
        except grades.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(grupo)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Institution Y GUi
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Institution Y GUi
    def update(self, request, pk=None):
        try:
            grupo = grades.objects.get(pk=pk)
        except grades.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(grupo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Institution Y GUi
    def destroy(self, request, pk=None):
        try:
            grupo = grades.objects.get(pk=pk)
            grupo.delete()
            return Response({"message": "Group deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except grades.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = grades.objects.all()
    # serializer_class = Grades_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = grades.objects.get(pk=pk)
    #     except grades.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
