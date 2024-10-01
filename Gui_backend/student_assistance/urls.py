from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentAssistanceViewSet

router = DefaultRouter()
router.register(r'student_assistance', StudentAssistanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
