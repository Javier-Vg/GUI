from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventsViewSet

router = DefaultRouter()
router.register(r'events', EventsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
