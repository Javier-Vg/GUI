from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status 
from .models import payments
from .serializers import Payments_Serializer

class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = payments.objects.all()
    serializer_class = Payments_Serializer

    def update(self, request, pk=None):
        try:
            institution = payments.objects.get(pk=pk)
        except payments.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)