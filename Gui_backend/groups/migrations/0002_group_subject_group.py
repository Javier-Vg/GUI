# Generated by Django 5.1.1 on 2024-10-03 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='subject_group',
            field=models.JSONField(default=1),
            preserve_default=False,
        ),
    ]
