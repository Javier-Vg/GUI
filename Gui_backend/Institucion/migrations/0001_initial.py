# Generated by Django 5.1.1 on 2024-10-02 14:56

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('direction', models.CharField(max_length=100)),
                ('payment_status', models.CharField(max_length=225)),
                ('subscription_date', models.DateField(auto_now_add=True)),
                ('suscription_type', models.CharField(max_length=50)),
                ('create_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('number_phone', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254, null=True, validators=[django.core.validators.EmailValidator()])),
                ('imagen_url', models.URLField(blank=True, null=True)),
            ],
        ),
    ]