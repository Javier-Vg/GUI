from rest_framework import viewsets
from .models import parents
from .serializers import Parents_Serializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
class ParentsViewSet(viewsets.ModelViewSet):
    queryset = parents.objects.all()
    serializer_class = Parents_Serializer
    permission_classes = [IsAuthenticated]
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        #obtioene los datos, los valida y los guarda
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            #obtiene los datos por medio de la pk
            parent = self.get_object()
        except parents.DoesNotExist:
            return Response({"error": "Parent not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(parent)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        try:
            #atualiza los datos por medio de la pk
            parent = parents.objects.get(pk=pk)
        except parents.DoesNotExist:
            return Response({"error": "Parent not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(parent, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            #elimina los datos por medio de la primary key
            parent = self.get_object()
            parent.delete()
            return Response({"message": "Parent deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except parents.DoesNotExist:
            return Response({"error": "Parent not found"}, status=status.HTTP_404_NOT_FOUND)

