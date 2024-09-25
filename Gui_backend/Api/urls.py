from django.urls import path, include
from . import views
from .router import router_post
# from .views import helloworld

urlpatterns = [
    path('post/', include(router_post.urls)),
    path('gui/', include("Gui.urls")),
    path('institutions/', include('Institucion.urls')), #Institucion.urls es e nombre del app
    path('teachers/', include('teachers.urls')), #Institucion.urls es e nombre del app
    path('administration/', include('administration.urls')), #Institucion.urls es e nombre del app
    path('contracts/', include('contracts.urls')),
    path('students/', include('students.urls')),
    path('groups/', include('groups.urls')),
    path('subjects/', include('materias.urls'))
]