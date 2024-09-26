from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GroupsViewSet

router = DefaultRouter()
router.register(r'grades', GroupsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]