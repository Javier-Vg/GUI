from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstitutionViewSet,LoginView

router = DefaultRouter()
router.register(r'institution', InstitutionViewSet,basename='institution')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView, name='login'),
]
