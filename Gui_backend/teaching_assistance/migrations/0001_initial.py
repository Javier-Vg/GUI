# Generated by Django 5.1.1 on 2024-10-03 19:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Institucion', '0001_initial'),
        ('staff', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='teaching_assistance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Present', 'present'), ('Absent ', 'absent')], max_length=225)),
                ('institution', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Institucion.institution')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='staff.staff')),
            ],
        ),
    ]
