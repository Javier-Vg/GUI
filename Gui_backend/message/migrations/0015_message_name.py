# Generated by Django 5.1.1 on 2024-10-16 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0014_remove_message_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]