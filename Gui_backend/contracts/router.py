from rest_framework.routers import DefaultRouter
from .views import Contracts_ViewSet

router_post = DefaultRouter()
router_post.register(
    prefix='posts', basename="posts", viewset= Contracts_ViewSet
)