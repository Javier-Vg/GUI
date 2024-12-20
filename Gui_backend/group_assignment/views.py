from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import group_assignment
from .serializers import GroupAssignment_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class GroupAssignmentViewSet(viewsets.ModelViewSet):
    queryset = group_assignment.objects.all()
    serializer_class = GroupAssignment_Serializer
    permission_classes = [IsAuthenticated]
    
    #Institution Y GUi, Estudiantes, profesores
    def retrieve(self, request, pk=None):
        try:
            assignment = group_assignment.objects.get(pk=pk)
        except group_assignment.DoesNotExist:
            return Response({"error": "Assignment not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(assignment)
        return Response(serializer.data, status=status.HTTP_200_OK)


    #profesor, institution y gui
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #profesor, institution y gui
    def update(self, request, pk=None):
        try:
            assignment = group_assignment.objects.get(pk=pk)
        except group_assignment.DoesNotExist:
            return Response({"error": "Assignment not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #profesor, institution y gui
    def destroy(self, request, pk=None):
        try:
            assignment = group_assignment.objects.get(pk=pk)
            assignment.delete()
            return Response({"message": "Assignment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except group_assignment.DoesNotExist:
            return Response({"error": "Assignment not found"}, status=status.HTTP_404_NOT_FOUND)
