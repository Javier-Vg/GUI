
from rest_framework import permissions
from Api.Key import KeyJWT
import jwt
class IsAuthenticatedWithCookieDirectors(permissions.BasePermission):
    def has_permission(self, request, view):
        cookie = request.COOKIES.get('AuthCookie')
        # Retornar True si la cookie existe
        if cookie:
            return True
        return False
# class IsAuthenticatedWithCookieDirectors(permissions.BasePermission):
#     def has_permission(self, request, view):
#         cookie = request.COOKIES.get('AuthCookie')
#         if cookie:
#             try:
#                 rol = self.get_role_from_token(cookie)
#                 # Permitir acceso si el rol es "Directors" o no es "Teacher"
#                 return rol == "Directors" or rol != "Teacher"
#             except Exception:
#                 return False
#         return False

#     def get_role_from_token(self, cookie):
#         # Decodificar el JWT
#         payload = jwt.decode(cookie, options={"verify_signature": False})
#         return payload.get("rol")


# class IsAuthenticatedWithCookieStaff(permissions.BasePermission):
#     def has_permission(self, request, view):
#         cookie = request.COOKIES.get('AuthCookie')
#         if cookie:
#             try:
#                 rol = self.get_role_from_token(cookie)
#                 # Permitir acceso si el rol es "Teacher"
#                 return rol == "Teacher"
#             except Exception:
#                 return False
#         return False

#     def get_role_from_token(self, cookie):
#         # Decodificar el JWT
#         payload = jwt.decode(cookie, options={"verify_signature": False})
#         return payload.get("rol")


# class IsAuthenticatedWithCookieGui(permissions.BasePermission):
#     def has_permission(self, request, view):
#         cookie = request.COOKIES.get('AuthCookie')
#         if cookie:
#             try:
#                 rol = self.get_role_from_token(cookie)
#                 # Permitir acceso si el rol es "Admin"
#                 return rol == "Admin"
#             except Exception:
#                 return False
#         return False

#     def get_role_from_token(self, cookie):
#         # Decodificar el JWT
#         payload = jwt.decode(cookie, options={"verify_signature": False})
#         return payload.get("rol")
# class IsAuthenticatedWithCookieDirectors(permissions.BasePermission):
#     def has_permission(self, request, view):
#         cookie = request.COOKIES.get('AuthCookie')
#         if cookie:
#             try:
#                 rol = self.get_role_from_token(cookie)
#                 if rol == "Directors" or rol != "Teacher":
#                     return True
#                 else:
#                     return False
#             except Exception as e:
#                 return False
#         return False
#     def get_role_from_token(self, cookie):
#         import jwt
#         payload = jwt.decode(cookie, options={"verify_signature": False})
#         return payload.get("role")

# class IsAuthenticatedWithCookieStaff(permissions.BasePermission):
#     def has_permission(self, request, view):
#         cookie = request.COOKIES.get('AuthCookie')
#         if cookie:
#             try:
#                 rol = self.get_role_from_token(cookie)
#                 if rol == "Teacher":
#                     return True
#                 else:
#                     return False
#             except Exception as e:
#                 return False
#         return False
#     def get_role_from_token(self, cookie):
#         import jwt
#         payload = jwt.decode(cookie, options={"verify_signature": False})
#         return payload.get("role")
    
# class IsAuthenticatedWithCookieGui(permissions.BasePermission):
#     def has_permission(self, request, view):
#         cookie = request.COOKIES.get('AuthCookie')
#         if cookie:
#             try:
#                 rol = self.get_role_from_token(cookie)
#                 if rol == "Admin":
#                     return True
#                 else:
#                     return False
#             except Exception as e:
#                 return False
#         return False
#     def get_role_from_token(self, cookie):
#         import jwt
#         payload = jwt.decode(cookie, options={"verify_signature": False})
#         return payload.get("role")

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
