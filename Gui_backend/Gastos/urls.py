from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GastoCreateView
router = DefaultRouter()
router.register(r'Gastos', GastoCreateView)
urlpatterns = [
    path('', include(router.urls)),
]