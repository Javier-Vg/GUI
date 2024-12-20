# Generated by Django 5.1.1 on 2024-10-11 16:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Gastos', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gasto',
            old_name='balance',
            new_name='Balance',
        ),
        migrations.RenameField(
            model_name='gasto',
            old_name='porcentaje_medico',
            new_name='precio_uniformes',
        ),
        migrations.RemoveField(
            model_name='gasto',
            name='uniformes',
        ),
        migrations.AddField(
            model_name='gasto',
            name='Total_ganancia',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='gasto',
            name='Total_gastos',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='gasto',
            name='fecha',
            field=models.DateField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='gasto',
            name='uniformes_comprados_cantidad',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='gasto',
            name='uniformes_regalados_cantidad',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
