from django.urls import path
from .views import CreateAdminView
urlpatterns = [
    path('Create_admin_Gui/', CreateAdminView.as_view(), name='create_Gui_admin'),
]
