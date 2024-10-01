# Generated by Django 5.1.1 on 2024-10-01 15:19

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Institucion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='administration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, null=True, validators=[django.core.validators.EmailValidator()])),
                ('rol', models.CharField(max_length=225)),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Institucion.institution')),
            ],
        ),
    ]
