# Generated by Django 5.1.1 on 2024-10-15 15:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0003_alter_schedule_days'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schedule',
            name='group',
        ),
    ]
