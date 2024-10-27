# Generated by Django 5.1.1 on 2024-10-27 01:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0006_alter_group_current_students'),
        ('student_assistance', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student_assistance',
            name='status',
        ),
        migrations.AddField(
            model_name='student_assistance',
            name='daily_attendance',
            field=models.JSONField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student_assistance',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='groups.group'),
        ),
    ]
