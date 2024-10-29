from django.urls import path, include
from . import views
from .router import router_post
from .views import upload_image

urlpatterns = [
    path('urlResponse/',upload_image, name='upload_image'),
    path('post/', include(router_post.urls)),
    path('gui/', include("Gui.urls")),
    path('institutions/', include('Institucion.urls')), #Institucion.urls es el nombre del app
    path('staff/', include('staff.urls')), 
    path('contracts/', include('contracts.urls')),
    path('students/', include('students.urls')),
    path('groups/', include('groups.urls')),
    path('subjects/', include('materias.urls')),
    path('grades/', include('grades.urls')),
    path('schedule/', include('schedule.urls')),
    path('teaching_assistance/', include('teaching_assistance.urls')),
    path('student_assistance/', include('student_assistance.urls')),
    path('parents/', include('parents.urls')),
    path('message/', include('message.urls')),
    path('events/', include('events.urls')),
    path('payments/', include('payments.urls')),
    path('tasks/', include('tasks.urls')),
    path('gastos/', include('Gastos.urls')),
    path('group_assignment/', include('group_assignment.urls')),
    # path('products/', include('products.urls')),
]