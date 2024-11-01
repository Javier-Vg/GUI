from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status 
from .models import payments
from .serializers import Payments_Serializer

# from permissions import IsAuthenticatedWithCookie

class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = payments.objects.all()
    serializer_class = Payments_Serializer
    # permission_classes = [IsAuthenticatedWithCookie]
    #Institutions y GUi
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       
    #Institutions y GUi 
    def retrieve(self, request, pk=None):
        try:
            payment = self.get_object()
        except payments.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Institutions y GUi
    def update(self, request, pk=None):
        try:
            payment = payments.objects.get(pk=pk)
        except payments.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Institutions y GUi
    def destroy(self, request, pk=None):
        try:
            payment = self.get_object()
            payment.delete()
            return Response({"message": "Payment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except payments.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = payments.objects.all()
    # serializer_class = Payments_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = payments.objects.get(pk=pk)
    #     except payments.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)