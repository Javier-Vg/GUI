# Generated by Django 5.1.1 on 2024-09-29 01:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0006_alter_staff_birthdate_date_alter_staff_email_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staff',
            name='imagen',
        ),
        migrations.RemoveField(
            model_name='staff',
            name='imagen_url',
        ),
    ]
