
from rest_framework import permissions
from Api.Key import KeyJWT
import jwt
class IsAuthenticatedWithCookie(permissions.BasePermission):
    def has_permission(self, request, view):
        cookie = request.COOKIES.get('AuthCookie')
        # Retornar True si la cookie existe
        if cookie:
            return True
        return False
class IsAuthenticatedWithCookieProfesor(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.COOKIES.get('AuthCookie')
        if token:
            try:
                role = self.get_role_from_token(token)
                # Permitir acceso si el rol es "Teacher"
                return role == "Teacher"
            except jwt.ExpiredSignatureError:
                # Token expirado
                return False
            except jwt.InvalidTokenError:
                # Token inválido
                return False
            except Exception:
                # Otros errores no previstos
                return False
        return False

    def get_role_from_token(self, token):

        payload = jwt.decode(token, KeyJWT, algorithms=["HS256"])
        return payload.get("rol")

class IsAuthenticatedWithCookieGui(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.COOKIES.get('AuthCookie')  # Obtener el token de la cookie
        if token:
            try:
                role = self.get_role_from_token(token)  # Obtener el rol del token
                return role == "Admin"  # Permitir acceso solo si el rol es "Admin"
            except jwt.ExpiredSignatureError:
                # Token expirado
                return False
            except jwt.InvalidTokenError:
                # Token inválido
                return False
            except Exception:
                # Otros errores no previstos
                return False
        return False

    def get_role_from_token(self, token):
        payload = jwt.decode(token, KeyJWT, algorithms=["HS256"])  # Verificar firma del JWT
        return payload.get("rol")  # Extraer el rol del payload
class IsAuthenticatedWithCookieStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.COOKIES.get('AuthCookie')  # Obtener el token de la cookie
        if token:
            try:
                role = self.get_role_from_token(token)  # Obtener el rol del token
                # Permitir acceso si el rol es "Directors" o si NO es "Teacher"
                return role == "Directors" or role != "Teacher"
            except jwt.ExpiredSignatureError:
                # Token expirado
                return False
            except jwt.InvalidTokenError:
                # Token inválido
                return False
            except Exception:
                # Otros errores no previstos
                return False
        return False

    def get_role_from_token(self, token):
        payload = jwt.decode(token, KeyJWT, algorithms=["HS256"])  # Verificar firma del JWT
        return payload.get("rol")  # Extraer el rol del payload

# class IsAuthenticatedWithCookieStudents(permissions.BasePermission):
#     def has_permission(self, request, view):
#         cookie = request.COOKIES.get('AuthCookie')
#         if cookie:
#             try:
#                 type_of_student = self.get_role_from_token(cookie)

#                 if type_of_student is not None:
#                     return True
#             except Exception as e:
#                 return False
#         return False

#     def get_role_from_token(self, cookie):
#         import jwt
#         # Decodifica el token sin verificar la firma para extraer el rol
#         payload = jwt.decode(cookie, options={"verify_signature": False})
#         # Retorna el valor de type_of_student si existe en el payload del token
#         return payload.get("type_of_student")

