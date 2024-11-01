from rest_framework.routers import DefaultRouter
from .views import TasksViewSet

router_post = DefaultRouter()
router_post.register(
    prefix='posts', basename="posts", viewset= TasksViewSet
)