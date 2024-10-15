from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import message
from .serializers import Message_Serializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = message.objects.all()
    serializer_class = Message_Serializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
