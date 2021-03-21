from rest_framework import serializers
from .models import Event, Todo

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start', 'end', 'allDay')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start', 'end', 'allDay')

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'text', 'completed')

# FULLSTENDIG UNØDVENDIG?????
class CreateTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('text', 'completed')

class UpdateTodoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(validators=[])

    class Meta:
        model = Todo
        fields = ('id', 'completed')

class DeleteTodoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(validators=[])

    class Meta:
        model = Todo
        fields = ('id')