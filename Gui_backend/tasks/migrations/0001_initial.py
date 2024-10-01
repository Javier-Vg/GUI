# Generated by Django 5.1.1 on 2024-10-01 15:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('materias', '0001_initial'),
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_group', models.JSONField()),
                ('educational_level', models.CharField(max_length=100)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.students')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='materias.subjects')),
            ],
        ),
    ]
