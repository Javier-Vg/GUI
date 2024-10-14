from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GroupAssignmentViewSet

router = DefaultRouter()
router.register(r'group_assignment', GroupAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
