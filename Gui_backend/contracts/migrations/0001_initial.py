# Generated by Django 5.1.1 on 2024-10-03 19:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Institucion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='contracts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contract_type', models.CharField(choices=[('Mensual', 'mensual'), ('Semanal', 'semanal'), ('Anual', 'anual')], max_length=100)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('salary', models.FloatField()),
                ('institution', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Institucion.institution')),
            ],
        ),
    ]
