# from django.shortcuts import render

# # Create your views here.
# # contact/views.py
# from django.http import JsonResponse
# from rest_framework.decorators import api_view
# import sib_api_v3_sdk
# from sib_api_v3_sdk.rest import ApiException
# import os
# # from .serializers import ContactSerializer

# @api_view(["POST"])
# def enviar_correo(request):
#     # Configuración de la API de Brevo
#     api_key = os.getenv('BREVO_API_KEY')
#     configuration = sib_api_v3_sdk.Configuration()
#     configuration.api_key['api-key'] = api_key
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
#             return JsonResponse({"message": "Correo enviado con éxito", "response": api_response}, status=200)
#         except ApiException as e:
#             return JsonResponse({"error": f"Error al enviar correo: {str(e)}"}, status=500)
#     else:
#         return JsonResponse({"error": serializer.errors}, status=400)
