# Generated by Django 3.1.7 on 2021-03-22 21:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_auto_20210322_1059'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='allDay',
        ),
        migrations.RemoveField(
            model_name='event',
            name='description',
        ),
        migrations.RemoveField(
            model_name='event',
            name='end',
        ),
        migrations.RemoveField(
            model_name='event',
            name='start',
        ),
        migrations.RemoveField(
            model_name='event',
            name='title',
        ),
    ]