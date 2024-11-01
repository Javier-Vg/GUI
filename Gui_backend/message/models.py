from django.db import models
from django.contrib.auth.models import User
from staff.models import staff
from students.models import students
from Institucion.models import Institution
from django.utils import timezone

class message(models.Model):
    message = models.CharField(max_length=500)
    staff = models.ForeignKey(staff, on_delete=models.CASCADE, null=True, blank=True, related_name="messages_sent_staff")
    students = models.ForeignKey(students, on_delete=models.CASCADE, null=True, blank=True, related_name="messages_sent_students")
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Message from {self.get_transmitter()} to {self.get_receiver()}"

    def get_transmitter(self):
        return self.transmitter_student.username if self.transmitter_student else self.transmitter_staff.username

    def get_receiver(self):
        return self.receiver_student.username if self.receiver_student else self.receiver_staff.username
