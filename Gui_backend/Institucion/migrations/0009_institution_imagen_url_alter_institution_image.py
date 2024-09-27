from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Institucion', '0008_institution_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='institution',
            name='imagen_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='institution',
            name='image',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
