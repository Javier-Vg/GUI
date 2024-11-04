from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view


from django.core.mail import send_mail
from django.http import JsonResponse
import json
@api_view(['POST'])
def send_contact_email(request):
    if request.method == 'POST':
        try: #recibe un json de el frontend con los datos
            data = json.loads(request.body)
            nombre = data.get('nombre')
            mensaje = data.get('mensaje')
            from_email = data.get('from_email')
            to_email = data.get('to_email')
            # Enviar correo
            send_mail( #envia el email con esa estructura
                subject='Nuevo mensaje de contacto',
                message=f'Nombre: {nombre}\n\n Correo de {from_email} para: {to_email}\n\n\nMensaje: {mensaje}',
                from_email= from_email,  # Cambia esto por tu correo electrónico
                recipient_list=[to_email],  # Cambia esto al correo del destinatario
            )
            return JsonResponse({'message': 'Email enviado con éxito.'})
        except Exception as e:
            return JsonResponse({'error': f'Ocurrió un error: {str(e)}'}, status=500)
    return JsonResponse({'error': 'Método no permitido'}, status=405)
