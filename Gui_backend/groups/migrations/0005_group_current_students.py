# Generated by Django 5.1.1 on 2024-10-06 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0004_rename_subject_group_group_communication_of_subjects_and_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='current_students',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]