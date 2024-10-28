from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import schedule
from .serializers import Schedule_Serializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# from permissions import IsAuthenticatedWithCookie
class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = schedule.objects.all()
    serializer_class = Schedule_Serializer
    permission_classes = [IsAuthenticated]
#Los 4
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Los 4

    def retrieve(self, request, pk=None):
        try:
            schedule_instance = self.get_object()
        except schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(schedule_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
#Los 4

    def update(self, request, pk=None):
        try:
            schedule_instance = schedule.objects.get(pk=pk)
            schedule_instance = schedule.objects.get(pk=pk)
        except schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(schedule_instance, data=request.data)
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(schedule_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Los 4

    def destroy(self, request, pk=None):
        try:
            schedule_instance = self.get_object()
            schedule_instance.delete()
            return Response({"message": "Schedule deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = schedule.objects.all()
    # serializer_class = Schedule_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = schedule.objects.get(pk=pk)
    #     except schedule.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Los 4

    def destroy(self, request, pk=None):
        try:
            schedule_instance = self.get_object()
            schedule_instance.delete()
            return Response({"message": "Schedule deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)
    # queryset = schedule.objects.all()
    # serializer_class = Schedule_Serializer

    # def update(self, request, pk=None):
    #     try:
    #         institution = schedule.objects.get(pk=pk)
    #     except schedule.DoesNotExist:
    #         return Response({"error": "Institution not found"}, status=status.HTTP_404_NOT_FOUND)
        
    #     serializer = self.get_serializer(institution, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)