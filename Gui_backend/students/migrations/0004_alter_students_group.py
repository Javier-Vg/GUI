# Generated by Django 5.1.1 on 2024-10-01 17:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
        ('students', '0003_students_email_students_guardian_phone_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='students',
            name='group',
            field=models.ForeignKey(default='None', on_delete=django.db.models.deletion.CASCADE, to='groups.group'),
        ),
    ]
