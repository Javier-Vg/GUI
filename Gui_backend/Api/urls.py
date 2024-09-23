from django.urls import path, include
from . import views
from .router import router_post
# from .views import helloworld

urlpatterns = [
    path('post/', include(router_post.urls)),
    path('gui/', include("Gui.urls"))
]