from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubjectsViewSet

router = DefaultRouter()
router.register(r'subjects', SubjectsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]