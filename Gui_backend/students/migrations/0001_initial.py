# Generated by Django 5.1.1 on 2024-10-01 15:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Institucion', '0001_initial'),
        ('groups', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='students',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('identification_number', models.CharField(max_length=100)),
                ('birthdate_date', models.DateField()),
                ('grade', models.CharField(choices=[('1st Grade', '1st Grade'), ('2nd Grade', '2nd Grade'), ('3rd Grade', '3rd Grade'), ('4th Grade', '4th Grade'), ('5th Grade', '5th Grade'), ('6th Grade', '6th Grade')], max_length=100)),
                ('academic_status', models.CharField(choices=[('Active', 'active'), ('Inactive', 'inactive')], max_length=100)),
                ('allergy_information', models.CharField(max_length=100)),
                ('contact_information', models.CharField(max_length=100)),
                ('imagen', models.ImageField(null=True, upload_to='images/')),
                ('imagen_url', models.URLField(blank=True, null=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='groups.group')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Institucion.institution')),
            ],
        ),
    ]
