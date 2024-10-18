from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import group_assignment
from .serializers import GroupAssignment_Serializer

class GroupAssignmentViewSet(viewsets.ModelViewSet):
    queryset = group_assignment.objects.all()
    serializer_class = GroupAssignment_Serializer

    def update(self, request, pk=None):
        try:
            institution = group_assignment.objects.get(pk=pk)
        except group_assignment.DoesNotExist:
            return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(institution, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        try:
            assignment = group_assignment.objects.get(pk=pk)
            # Aquí, asegúrate de no referenciar 'assignment.group.group'
            assignment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except group_assignment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)