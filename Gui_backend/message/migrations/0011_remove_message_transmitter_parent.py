# Generated by Django 5.1.1 on 2024-10-15 17:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0010_message_transmitter_parent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='transmitter_parent',
        ),
    ]
