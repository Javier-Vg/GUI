# from .permissions import IsAuthenticatedWithCookie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer
import requests
from .Key import clientId
@api_view(['GET'])
def helloworld(request):
    
    return Response({"message": "Hello, World!"})


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class=PostSerializer,
    # permission_classes = [IsAuthenticatedWithCookie]
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

@api_view(['POST'])
def upload_image(request):
    # Obtener el archivo de la solicitud
    image = request.FILES.get('image')

    if not image:
        return Response({"error": "No se ha proporcionado ninguna imagen."}, status=400)

    # Configurar la solicitud a la API de Imgur
    url = "https://api.imgur.com/3/image/"
    headers = {
        "Authorization": f"Client-ID {clientId}"
    }
    
    # Hacer la solicitud POST a Imgur
    try:
        response = requests.post(
            url,
            headers=headers,
            files={'image': image.read()}
        )
        response_data = response.json()

        if response.status_code == 200:
            image_url = response_data['data']['link']  # URL de la imagen subida
            return Response({"image_url": image_url}, status=201)
        else:
            return Response({"error": "Error al subir la imagen a Imgur."}, status=500)
    except Exception as e:
        return Response({"error": str(e)}, status=500)