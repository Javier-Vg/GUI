# your_project/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
from .views import UserCreateView,UserViewSet,login_view
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
    path('user/create/', UserCreateView.as_view({'post': 'create'}), name='user-create'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
]