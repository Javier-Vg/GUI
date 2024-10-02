from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Administration_ViewSet

router = DefaultRouter()
router.register(r'administration', Administration_ViewSet)

urlpatterns = [
    path('', include(router.urls)),
]