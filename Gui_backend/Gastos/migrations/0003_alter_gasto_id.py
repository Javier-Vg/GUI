# Generated by Django 5.1.1 on 2024-10-03 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Gastos', '0002_gasto_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
