# Generated by Django 5.1.1 on 2024-09-26 20:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('grades', '0001_initial'),
        ('materias', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='grades',
            name='subjects',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='materias.subjects'),
        ),
    ]