# Generated by Django 3.0.2 on 2020-10-08 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ItemsDir', '0002_auto_20201006_0745'),
    ]

    operations = [
        migrations.AddField(
            model_name='items',
            name='sold_to',
            field=models.CharField(default='', max_length=45),
        ),
    ]
