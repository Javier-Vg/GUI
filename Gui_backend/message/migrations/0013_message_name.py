# Generated by Django 5.1.1 on 2024-10-16 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0012_rename_transmitter_staff_message_staff_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
