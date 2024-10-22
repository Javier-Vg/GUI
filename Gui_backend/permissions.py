
from rest_framework import permissions
from Api.Key import KeyJWT
class IsAuthenticatedWithCookieInstitutions(permissions.BasePermission):
    def has_permission(self, request, view):
        cookie = request.COOKIES.get('AuthCookie')
        if cookie:
            try:
                rol = self.get_role_from_token(cookie)
                if rol == "Directors" or  "teacher":
                    return True
            except Exception as e:
                return False
        return False
    def get_role_from_token(self, cookie):
        import jwt
        payload = jwt.decode(cookie, options={"verify_signature": False})
        return payload.get("role")

class IsAuthenticatedWithCookieStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        cookie = request.COOKIES.get('AuthCookie')
        if cookie:
            try:
                rol = self.get_role_from_token(cookie)
                if rol == "Directors" or  "teacher":
                    return True
            except Exception as e:
                return False
        return False
    def get_role_from_token(self, cookie):
        import jwt
        payload = jwt.decode(cookie, options={"verify_signature": False})
        return payload.get("role")
    
class IsAuthenticatedWithCookieGui(permissions.BasePermission):
    def has_permission(self, request, view):
        cookie = request.COOKIES.get('AuthCookie')
        if cookie:
            try:
                rol = self.get_role_from_token(cookie)
                if rol == "Directors" or  "teacher":
                    return True
            except Exception as e:
                return False
        return False
    def get_role_from_token(self, cookie):
        import jwt
        payload = jwt.decode(cookie, options={"verify_signature": False})
        return payload.get("role")

class IsAuthenticatedWithCookieStudents(permissions.BasePermission):
    def has_permission(self, request, view):
        cookie = request.COOKIES.get('AuthCookie')
        if cookie:
            try:
                rol = self.get_role_from_token(cookie)
                if rol == "Directors" or  "teacher":
                    return True
            except Exception as e:
                return False
        return False
    def get_role_from_token(self, cookie):
        import jwt
        payload = jwt.decode(cookie, options={"verify_signature": False})
        return payload.get("role")
