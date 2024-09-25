from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Contracts_ViewSet

router = DefaultRouter()
router.register(r'contracts', Contracts_ViewSet)

urlpatterns = [
    path('', include(router.urls)),
]