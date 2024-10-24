from rest_framework import viewsets
from .models import parents
from .serializers import Parents_Serializer
from rest_framework import viewsets, status
from rest_framework.response import Response

# from permissions import IsAuthenticatedWithCookie
#ESTA NO SE USA
# Create your views here.
class ParentsViewSet(viewsets.ModelViewSet):
    queryset = parents.objects.all()
    serializer_class = Parents_Serializer
    # permission_classes = [IsAuthenticatedWithCookie]
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            parent = self.get_object()
        except parents.DoesNotExist:
            return Response({"error": "Parent not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(parent)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        try:
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
            parent = self.get_object()
            parent.delete()
            return Response({"message": "Parent deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except parents.DoesNotExist:
            return Response({"error": "Parent not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = parents.objects.all()
    # serializer_class = Parents_Serializer
