from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet

router = DefaultRouter()
router.register(r'message', MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('messages/teacher-messages/<int:teacher_id>/', MessageViewSet.as_view({'get': 'list_teacher_messages'}), name='teacher-messages'),
]
