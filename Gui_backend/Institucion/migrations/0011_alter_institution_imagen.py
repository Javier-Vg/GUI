# Generated by Django 5.1.1 on 2024-09-26 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Institucion', '0010_remove_institution_image_institution_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='institution',
            name='imagen',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
