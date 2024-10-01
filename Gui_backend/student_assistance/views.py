from rest_framework import viewsets
from .models import student_assistance
from .serializers import StudentAssistance_Serializer

# Create your views here.
class StudentAssistanceViewSet(viewsets.ModelViewSet):
    queryset = student_assistance.objects.all()
    serializer_class = StudentAssistance_Serializer