# Generated by Django 3.2.7 on 2021-10-01 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_auto_20210930_1758'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(default='default.png', null=True, upload_to='img'),
        ),
    ]
