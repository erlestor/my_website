from django.shortcuts import render
from rest_framework import generics, status
from .serializers import EventSerializer, DeleteEventSerializer, TodoSerializer, CreateTodoSerializer, UpdateTodoSerializer
from .models import Event, Todo
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class EventView(APIView):
    serializer_class = EventSerializer
    
    def get(self, request, format=None):
        events = []
        queryset = Event.objects.all()
        for event in queryset:
            events.append(EventSerializer(event).data)
        return Response(events, status=status.HTTP_200_OK)


class CreateEvent(APIView):
    serializer_class = EventSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            title = serializer.data.get('title')
            start = serializer.data.get('start')
            end = serializer.data.get('end')
            allDay = serializer.data.get('allDay')

            event = Event(title=title, start=start, end=end, allDay=allDay)
            event.save()
           
            return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteEvent(APIView):
    serializer_class = DeleteEventSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            id = serializer.data.get('id')  # tror id kan gi error

            queryset = Event.objects.filter(id=id)
            if not queryset.exists():
                return Response({"msg": "Event doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
            
            event = queryset[0]
            event.delete()
            return Response({'msg': 'Delete successful'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class TodoView(APIView):
    serializer_class = TodoSerializer
    
    def get(self, request, format=None):
        todos = []
        queryset = Todo.objects.all()
        for todo in queryset:
            todos.append(TodoSerializer(todo).data)
        return Response(todos, status=status.HTTP_200_OK)


class CreateTodo(APIView):
    serializer_class = CreateTodoSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            text = serializer.data.get('text')
            todo = Todo(text=text)
            todo.save()
           
            return Response(TodoSerializer(todo).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateTodo(APIView):
    serializer_class = UpdateTodoSerializer
    
    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            id = serializer.data.get('id')  # tror id kan gi error
            completed = serializer.data.get('completed')

            queryset = Todo.objects.filter(id=id)
            if not queryset.exists():
                return Response({"msg": "Todo doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
            
            todo = queryset[0]
            todo.completed = completed
            todo.save(update_fields=['completed'])
            return Response(TodoSerializer(todo).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        

class DeleteTodo(APIView):
    serializer_class = UpdateTodoSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            id = serializer.data.get('id')  # tror id kan gi error

            queryset = Todo.objects.filter(id=id)
            if not queryset.exists():
                return Response({"msg": "Todo doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
            
            todo = queryset[0]
            todo.delete()
            return Response({'msg': 'Delete successful'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)