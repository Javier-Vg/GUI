# Generated by Django 5.1.1 on 2024-10-05 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0004_alter_staff_imagen_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staff',
            name='imagen_url',
            field=models.URLField(),
        ),
    ]
