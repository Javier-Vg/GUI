# Generated by Django 5.1.1 on 2024-10-02 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Institucion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='institution',
            name='monthly_payent',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
