# Generated by Django 5.1.1 on 2024-10-11 17:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Gastos', '0002_rename_balance_gasto_balance_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gasto',
            name='Balance',
        ),
        migrations.AddField(
            model_name='gasto',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='fecha',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
