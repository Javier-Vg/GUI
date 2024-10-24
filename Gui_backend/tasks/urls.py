from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TasksViewSet


router = DefaultRouter()
router.register(r'tasks', TasksViewSet)

urlpatterns = [
    path('', include(router.urls)),
]