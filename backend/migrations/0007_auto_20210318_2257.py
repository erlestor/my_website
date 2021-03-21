# Generated by Django 3.1.7 on 2021-03-18 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_event_allday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='allDay',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
    ]