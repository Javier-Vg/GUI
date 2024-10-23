from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status 
from .models import teaching_assistance
from .serializers import TeachingAssistance_Serializer

class TeachingAssistanceViewSet(viewsets.ModelViewSet):
    queryset = teaching_assistance.objects.all()
    serializer_class = TeachingAssistance_Serializer

#Gui, Institutions
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Gui, Institutions
    def retrieve(self, request, pk=None):
        try:
            assistance_instance = self.get_object()
        except teaching_assistance.DoesNotExist:
            return Response({"error": "Teaching assistance not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(assistance_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
#Gui, Institutions
    def update(self, request, pk=None):
        try:
            assistance_instance = teaching_assistance.objects.get(pk=pk)
        except teaching_assistance.DoesNotExist:
            return Response({"error": "Teaching assistance not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(assistance_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Gui, Institutions
    def destroy(self, request, pk=None):
        try:
            assistance_instance = self.get_object()
            assistance_instance.delete()
            return Response({"message": "Teaching assistance deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except teaching_assistance.DoesNotExist:
            return Response({"error": "Teaching assistance not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = teaching_assistance.objects.all()
    # serializer_class = TeachingAssistance_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = teaching_assistance.objects.get(pk=pk)
    #     except teaching_assistance.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)