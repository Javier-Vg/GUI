from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminGuiViewSet

router = DefaultRouter()
router.register(r'create_admin', AdminGuiViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
