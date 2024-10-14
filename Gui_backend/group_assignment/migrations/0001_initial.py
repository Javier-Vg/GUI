# Generated by Django 5.1.1 on 2024-10-14 21:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('groups', '0006_alter_group_current_students'),
        ('students', '0002_alter_students_group_alter_students_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='group_assignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registration_day', models.CharField(max_length=100)),
                ('group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='groups.group')),
                ('student', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='students.students')),
            ],
        ),
    ]
