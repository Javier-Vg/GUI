from rest_framework.routers import DefaultRouter
from .views import EventsViewSet

router_post = DefaultRouter()
router_post.register(
    prefix='posts', basename="posts", viewset=EventsViewSet
)