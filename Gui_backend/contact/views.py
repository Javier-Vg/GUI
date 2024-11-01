from django.shortcuts import render

# Create your views here.
# contact/views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
import os
from .serializers import ContactSerializer
from Api.Key import emailId

# @api_view(["GET", "POST"])
# def enviar_correo(request):

#     configuration = sib_api_v3_sdk.Configuration()
#     configuration.api_key['api-key'] = emailId
#     api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

#     # Serializar los datos del request
#     serializer = ContactSerializer(data=request.data)
#     if serializer.is_valid():
#         email_destino = serializer.validated_data.get('email')
#         contenido_html = f"<p>Hola {serializer.validated_data.get('name')}, este es un correo de prueba.</p>"
        

#         email_origen = {
#             "name": "Prueba",
#             "email": "noreply@gmail.com"
#         }

#         send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
#             to=[{"email": email_destino}],
#             sender=email_origen,
#             subject="Prueba de Envío de Correo",
#             html_content=contenido_html
#         )

#         try:
#             api_response = api_instance.send_transac_email(send_smtp_email)

#             # Convertir solo la información relevante en un diccionario
#             response_data = {
#                 "message": "Correo enviado con éxito",
#                 "messageId": api_response.message_id  # Acceder al atributo message_id directamente
#             }
#             return JsonResponse(response_data, status=200)
#         except ApiException as e:
#             return JsonResponse({"error": f"Error al enviar correo: {str(e)}"}, status=500)
#     else:
#         return JsonResponse({"error": serializer.errors}, status=400)
# from django.core.mail import send_mail
# from django.http import JsonResponse
# import json
# @api_view(['POST'])
# def send_contact_email(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             nombre = data.get('nombre')
#             mensaje = data.get('mensaje')
#             # Enviar correo
#             send_mail(
#                 subject='Nuevo mensaje de contacto',
#                 message=f'Nombre: {nombre}\nMensaje: {mensaje}',
#                 from_email='dgonazlez@fwdcostarica.com',  # Cambia esto por tu correo electrónico
#                 recipient_list=['dgonzalez@fwdcostarica.com'],  # Cambia esto al correo del destinatario
#             )
#             return JsonResponse({'message': 'Email enviado con éxito.'})
#         except Exception as e:
#             return JsonResponse({'error': f'Ocurrió un error: {str(e)}'}, status=500)
#     return JsonResponse({'error': 'Método no permitido'}, status=405)

# views.py en Django
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json
# import requests


# @api_view(['POST'])
# def send_email(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         from_name = data.get('user_name')
#         to_name = data.get('to_name')  # Puedes establecerlo fijo o recibirlo en los datos
#         user_email = data.get('user_email')
#         message = data.get('message')

#         if not from_name or not user_email or not message:
#             return JsonResponse({'error': 'Todos los campos son obligatorios.'}, status=400)

#         # Llamada a la API de EmailJS con los parámetros de la plantilla
#         emailjs_url = "https://api.emailjs.com/api/v1.0/email/send"
#         payload = {
#             'service_id': "service_h9spfqu",
#             'template_id': "template_2fqlm21",
#             'user_id': "Pfr4da-XGcIA3TO90",
#             'template_params': {
#                 'to_name': to_name,
#                 'from_name': from_name,
#                 'from_email': user_email,
#                 'message': message
#             }
#         }

#         headers = {'Content-Type': 'application/json'}
#         response = requests.post(emailjs_url, json=payload, headers=headers)

#         if response.status_code == 200:
#             return JsonResponse({'success': 'Correo enviado exitosamente!'})
#         else:
#             return JsonResponse({'error': 'Error al enviar el correo con EmailJS'}, status=500)
#     return JsonResponse({'error': 'Método no permitido'}, status=405)
from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.decorators import api_view
import json

@api_view(['POST'])
def send_email(request):
    if request.method == 'POST':
        try:
            # Cargar los datos JSON del cuerpo de la solicitud
            data = json.loads(request.body)
            nombre = data.get('nombre')
            mensaje = data.get('mensaje')
            
            # Validaciones
            if not nombre or not mensaje:
                return JsonResponse({'error': 'Nombre y mensaje son requeridos.'}, status=400)

            # Enviar correo
            send_mail(
                subject='Nuevo mensaje de contacto',
                message=f'Nombre: {nombre}\nMensaje: {mensaje}',
                from_email='dgonzalez@fwdcostarica.com',  # Cambia esto por tu correo electrónico
                recipient_list=['dgonzalez@fwdcostarica.com'],  # Cambia esto al correo del destinatario
            )
            return JsonResponse({'message': 'Email enviado con éxito.'})
        except Exception as e:
            # Capturar y devolver el error específico
            return JsonResponse({'error': f'Ocurrió un error: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)