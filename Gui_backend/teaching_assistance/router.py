from rest_framework.routers import DefaultRouter
from .views import teaching_assistance

router_post = DefaultRouter()
router_post.register(
    prefix='posts', basename="posts", viewset= teaching_assistance
)