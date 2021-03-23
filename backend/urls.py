from django.urls import path
from .views import EventView, CreateEvent, DeleteEvent, UpdateEvent, TodoView, CreateTodo, UpdateTodo, DeleteTodo

urlpatterns = [
    # hvert element blir på formen:
    # path('room', RoomView.as_view()),
    path('todos', TodoView.as_view()),
    path('create-todo', CreateTodo.as_view()),
    path('update-todo', UpdateTodo.as_view()),
    path('delete-todo', DeleteTodo.as_view()),
    path('events', EventView.as_view()),
    path('create-event', CreateEvent.as_view()),
    path('update-event', UpdateEvent.as_view()),
    path('delete-event', DeleteEvent.as_view()),
]
