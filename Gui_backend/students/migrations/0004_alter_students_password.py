# Generated by Django 5.1.1 on 2024-10-09 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0003_rename_name_students_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='students',
            name='password',
            field=models.CharField(max_length=128, null=True),
        ),
    ]