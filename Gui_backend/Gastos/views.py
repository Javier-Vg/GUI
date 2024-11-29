from rest_framework import viewsets
from .models import Gasto
from .serializers import GastosSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
class GastoCreateView(viewsets.ModelViewSet):
    queryset = Gasto.objects.all()
    serializer_class = GastosSerializer
    permission_classes = [IsAuthenticated]
    
    def retrieve(self, request, pk=None):
        try:
            gasto = Gasto.objects.get(pk=pk)
        except Gasto.DoesNotExist:
            return Response({"error": "Gasto not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(gasto)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Admin Institution, Gui
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Admin Institution, Gui
    def update(self, request, pk=None):
        try:
            gasto = Gasto.objects.get(pk=pk)
        except Gasto.DoesNotExist:
            return Response({"error": "Gasto not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(gasto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Admin Institution, Gui
    def destroy(self, request, pk=None):
        try:
            gasto = Gasto.objects.get(pk=pk)
            gasto.delete()
            return Response({"message": "Gasto deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Gasto.DoesNotExist:
            return Response({"error": "Gasto not found"}, status=status.HTTP_404_NOT_FOUND)