import requests
from django.conf import settings

def upload_image_to_imgur(image_path):
    url = "https://api.imgur.com/3/upload"
    headers = {
        "Authorization": f"Client-ID {settings.IMGUR_CLIENT_ID}"
    }
    with open(image_path, 'rb') as image_file:  
        response = requests.post(url, headers=headers, files={"image": image_file})  #Esto abre la imagen que se encuentra en image_path en modo binario (rb) para poder enviarla a la API de Imgur
    
    if response.status_code == 200:
        data = response.json()
        return data['data']['link']  # Retorna la URL de la imagen en Imgur
    else:
        raise Exception(f"Error uploading image to Imgur: {response.json()}")
