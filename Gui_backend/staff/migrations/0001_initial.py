# Generated by Django 5.1.1 on 2024-10-01 15:19

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Institucion', '0001_initial'),
        ('contracts', '0001_initial'),
        ('materias', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('identification_number', models.CharField(max_length=100)),
                ('birthdate_date', models.DateField()),
                ('direction', models.CharField(max_length=100)),
                ('phone_number', models.IntegerField()),
                ('email', models.EmailField(max_length=254, null=True, validators=[django.core.validators.EmailValidator()])),
                ('employment_status', models.CharField(choices=[('Inactive', 'inactive'), ('Active', 'active')], max_length=100)),
                ('position', models.CharField(choices=[('Teacher', 'teacher'), ('Directors', 'directors'), ('Educational counselors', 'educational counselors'), ('Secretaries', 'secretaries'), ('Cleaning staff', 'cleaning staff'), ('Librarians', 'librarians'), ('Security staff', 'security staff')], max_length=100)),
                ('salary', models.FloatField(null=True)),
                ('contract', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_contracts', to='contracts.contracts')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Institucion.institution')),
                ('subjects', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='materias.subjects')),
            ],
        ),
    ]
