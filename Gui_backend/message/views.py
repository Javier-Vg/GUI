from rest_framework import viewsets
from .models import message
from .serializers import Message_Serializer

# Create your views here.
class MessageViewSet(viewsets.ModelViewSet):
    queryset = message.objects.all()
    serializer_class = Message_Serializer
