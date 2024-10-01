from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeachersViewSet

router = DefaultRouter()
router.register(r'teachers', TeachersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
