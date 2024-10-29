from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParentsViewSet

router = DefaultRouter()
router.register(r'parents', ParentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


#No se usa por el momento.