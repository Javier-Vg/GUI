from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import contracts
from .serializers import Contracts_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny




# Create your views here.
class Contracts_ViewSet(viewsets.ModelViewSet):
    queryset = contracts.objects.all()
    serializer_class = Contracts_Serializer
    permission_classes = [IsAuthenticated]
    
    # permission_classes = [IsAuthenticatedWithCookieDirectors]
    # permission_classes = [IsAuthenticatedWithCookie]
    


    def retrieve(self, request, pk=None):
        # self.permission_classes = [IsAuthenticatedWithCookieDirectors]
        # self.check_permissions(request)
        try:
            contract = contracts.objects.get(pk=pk)
        except contracts.DoesNotExist:
            return Response({"error": "Contract not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(contract)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def create(self, request):
        # self.permission_classes = [IsAuthenticatedWithCookieDirectors]
        # self.check_permissions(request)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk=None):
        # self.permission_classes =[IsAuthenticatedWithCookieDirectors]
        # self.check_permissions(request)
        # self.permission_classes =[IsAuthenticatedWithCookieDirectors]
        # self.check_permissions(request)
        try:
            contract = contracts.objects.get(pk=pk)
            contract = contracts.objects.get(pk=pk)
        except contracts.DoesNotExist:
            return Response({"error": "Contract not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"error": "Contract not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(contract, data=request.data)
        serializer = self.get_serializer(contract, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        # self.permission_classes = [IsAuthenticatedWithCookieDirectors]
        # self.check_permissions(request)
        try:
            contract = contracts.objects.get(pk=pk)
            contract.delete()
            return Response({"message": "Contract deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except contracts.DoesNotExist:
            return Response({"error": "Contract not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # queryset = contracts.objects.all()
    # serializer_class = Contracts_Serializer
    # permission_classes = [IsAuthenticatedWithCookieDirectors or IsAuthenticatedWithCookieGui]
    

    # def update(self, request, pk=None):
    #     try:
    #         institution = contracts.objects.get(pk=pk)
    #     except contracts.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, pk=None):
        # self.permission_classes = [IsAuthenticatedWithCookieDirectors]
        # self.check_permissions(request)
        try:
            contract = contracts.objects.get(pk=pk)
            contract.delete()
            return Response({"message": "Contract deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except contracts.DoesNotExist:
            return Response({"error": "Contract not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # queryset = contracts.objects.all()
    # serializer_class = Contracts_Serializer
    # permission_classes = [IsAuthenticatedWithCookieDirectors or IsAuthenticatedWithCookieGui]
    

    # def update(self, request, pk=None):
    #     try:
    #         institution = contracts.objects.get(pk=pk)
    #     except contracts.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)