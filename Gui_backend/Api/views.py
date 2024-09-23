from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
@api_view(['GET'])
def helloworld(request):
    return Response({"message": "Hello, World!"})

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class=PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]