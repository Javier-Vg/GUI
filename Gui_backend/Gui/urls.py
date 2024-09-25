from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminGuiViewSet

router = DefaultRouter()
router.register(r'admins', AdminGuiViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
