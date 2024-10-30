from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import group
from .serializers import Groups_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny
class GroupsViewSet(viewsets.ModelViewSet):
    queryset = group.objects.all()
    serializer_class = Groups_Serializer
    permission_classes = [AllowAny] # AllowAny para poder ingresar a la pagina de django, y IsAuthenticated para privatizarla
    
    def retrieve(self, request, pk=None):
        try:
            group_instance = group.objects.get(pk=pk)
        except group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(group_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Institutions y Gui
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Institutions y Gui
    def update(self, request, pk=None):
        try:
            group_instance = group.objects.get(pk=pk)
            group_instance = group.objects.get(pk=pk)
        except group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(group_instance, data=request.data)
        serializer = self.get_serializer(group_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Institutions y Gui
    def destroy(self, request, pk=None):
        try:
            group_instance = group.objects.get(pk=pk)
            group_instance.delete()
            return Response({"message": "Group deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = group.objects.all()
    # serializer_class = Groups_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = group.objects.get(pk=pk)
    #     except group.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Institutions y Gui
    def destroy(self, request, pk=None):
        try:
            group_instance = group.objects.get(pk=pk)
            group_instance.delete()
            return Response({"message": "Group deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except group.DoesNotExist:
            return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = group.objects.all()
    # serializer_class = Groups_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = group.objects.get(pk=pk)
    #     except group.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
