from django.shortcuts import render
from django.views.generic import CreateView
from Gui.models import Admin_Gui

# Create your views here.
class CreateAdminView(CreateView):
    model = Admin_Gui
    fields = ["nombre","email","password","rol"]
    template_name = "createGuiAdmin.html"