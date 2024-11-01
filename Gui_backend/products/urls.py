from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Product

router = DefaultRouter()
router.register(r'products', Product)

urlpatterns = [
    path('', include(router.urls)),
]

#No se usa