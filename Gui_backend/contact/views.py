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

@api_view(["GET", "POST"])
def enviar_correo(request):

    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = emailId
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

    # Serializar los datos del request
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        email_destino = serializer.validated_data.get('email')
        contenido_html = f"<p>Hola {serializer.validated_data.get('name')}, este es un correo de prueba.</p>"

        email_origen = {
            "name": "Prueba",
            "email": "noreply@gmail.com"
        }

        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": email_destino}],
            sender=email_origen,
            subject="Prueba de Envío de Correo",
            html_content=contenido_html
        )

        try:
            api_response = api_instance.send_transac_email(send_smtp_email)

            # Convertir solo la información relevante en un diccionario
            response_data = {
                "message": "Correo enviado con éxito",
                "messageId": api_response.message_id  # Acceder al atributo message_id directamente
            }
            return JsonResponse(response_data, status=200)
        except ApiException as e:
            return JsonResponse({"error": f"Error al enviar correo: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": serializer.errors}, status=400)