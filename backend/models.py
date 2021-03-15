from django.db import models

# Create your models here.
class Event(models.Model):
    # tror id blir autogenerert faktisk
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200, null=True)
    start = models.DateTimeField()
    end = models.DateTimeField(null=True)

class Todo(models.Model):
    # tror id blir autogenerert faktisk
    text = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)
