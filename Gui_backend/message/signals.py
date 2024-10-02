# from django.utils import timezone
# from django.dispatch import receiver
# from message.models import message
# from django.db.models.signals import pre_save

# @receiver(pre_save, sender=message)
# def set_adoption_date(sender, instance, **kwargs):
#     print("I'm working")
#     instance.message = instance.message.upper()