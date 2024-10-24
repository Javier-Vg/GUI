from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import tasks
from .serializers import Tasks_Serializer

# from permissions import IsAuthenticatedWithCookie
class TasksViewSet(viewsets.ModelViewSet):
    queryset = tasks.objects.all()
    serializer_class = Tasks_Serializer
    # permission_classes = [IsAuthenticatedWithCookie]
#Gui, Institutions, teacher
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Gui, Institutions, teacher y students
    def retrieve(self, request, pk=None):
        try:
            task_instance = self.get_object()
        except tasks.DoesNotExist:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(task_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

#Gui, Institutions, teacher
    def update(self, request, pk=None):
        try:
            task_instance = tasks.objects.get(pk=pk)
        except tasks.DoesNotExist:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(task_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Gui, Institutions, teacher
    def destroy(self, request, pk=None):
        try:
            task_instance = self.get_object()
            task_instance.delete()
            return Response({"message": "Task deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except tasks.DoesNotExist:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)




