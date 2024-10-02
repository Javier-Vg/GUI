from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentsViewSet

router = DefaultRouter()
router.register(r'payments', PaymentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
