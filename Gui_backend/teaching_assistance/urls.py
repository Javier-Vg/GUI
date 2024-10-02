from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeachingAssistanceViewSet

router = DefaultRouter()
router.register(r'teaching_assistance', TeachingAssistanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
