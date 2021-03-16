from django.shortcuts import render
from rest_framework import generics, status
from .serializers import EventSerializer, TodoSerializer, CreateTodoSerializer
from .models import Event, Todo
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class EventView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
class TodoView(APIView):
    serializer_class = TodoSerializer
    
    def get(self, request, format=None):
        todos = []
        queryset = Todo.objects.all()
        for todo in queryset:
            todos.append(TodoSerializer(todo).data)
        return Response(todos, status=status.HTTP_200_OK)


class CreateTodoView(APIView):
    serializer_class = CreateTodoSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            text = serializer.data.get('text')
            todo = Todo(text=text)
            todo.save()
           
            return Response(TodoSerializer(todo).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
