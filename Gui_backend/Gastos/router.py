from rest_framework import routers
from .views import GastosViewSet

router = routers.DefaultRouter()
router.register(r'gastos', GastosViewSet, basename='gastos')

urlpatterns = router.urls
