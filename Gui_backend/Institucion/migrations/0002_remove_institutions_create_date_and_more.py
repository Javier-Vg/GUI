# Generated by Django 5.1.1 on 2024-09-24 17:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Institucion', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='institutions',
            name='create_date',
        ),
        migrations.RemoveField(
            model_name='institutions',
            name='direction',
        ),
        migrations.RemoveField(
            model_name='institutions',
            name='name',
        ),
        migrations.RemoveField(
            model_name='institutions',
            name='payment_status',
        ),
        migrations.RemoveField(
            model_name='institutions',
            name='suscription_type',
        ),
    ]
