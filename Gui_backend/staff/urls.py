from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StaffViewSet,LoginView

router = DefaultRouter()
router.register(r'staff', StaffViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView, name="Login"),
]
