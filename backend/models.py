from django.db import models

# Create your models here.
class Event(models.Model):
    pass


class Todo(models.Model):
    # tror id blir autogenerert faktisk
    text = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)

