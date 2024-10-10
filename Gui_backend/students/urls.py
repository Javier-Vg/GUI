from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentsViewSet,LoginView

router = DefaultRouter()
router.register(r'students', StudentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView, name='login'),
]
