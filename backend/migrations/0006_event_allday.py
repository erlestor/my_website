# Generated by Django 3.1.7 on 2021-03-18 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_todo'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='allDay',
            field=models.BooleanField(null=True),
        ),
    ]