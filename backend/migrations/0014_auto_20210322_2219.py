# Generated by Django 3.1.7 on 2021-03-22 21:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_auto_20210322_2214'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='allDay',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='event',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='event',
            name='end',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='start',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='title',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
