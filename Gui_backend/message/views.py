from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import message
from .serializers import Message_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny
class MessageViewSet(viewsets.ModelViewSet):
    queryset = message.objects.all()
    serializer_class = Message_Serializer
    permission_classes = [AllowAny]
    #Los 4
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Los 4
    def retrieve(self, request, pk=None):
        try:
            msg = self.get_object()
        except message.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(msg)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Los 4
    def update(self, request, pk=None):
        try:
            msg = message.objects.get(pk=pk)
        except message.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(msg, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Los 4
    def destroy(self, request, pk=None):
        try:
            msg = self.get_object()
            msg.delete()
            return Response({"message": "Message deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except message.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = message.objects.all()
    # serializer_class = Message_Serializer

    # def create(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Los 4
    def retrieve(self, request, pk=None):
        try:
            msg = self.get_object()
        except message.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(msg)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Los 4
    def update(self, request, pk=None):
        try:
            msg = message.objects.get(pk=pk)
        except message.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(msg, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Los 4
    def destroy(self, request, pk=None):
        try:
            msg = self.get_object()
            msg.delete()
            return Response({"message": "Message deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except message.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = message.objects.all()
    # serializer_class = Message_Serializer

    # def create(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
