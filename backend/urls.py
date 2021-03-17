from django.urls import path
from .views import EventView, TodoView, CreateTodo, UpdateTodo, DeleteTodo

urlpatterns = [
    # hvert element blir på formen:
    # path('room', RoomView.as_view()),
    path('calendar', EventView.as_view()),
    path('todos', TodoView.as_view()),
    path('create-todo', CreateTodo.as_view()),
    path('update-todo', UpdateTodo.as_view()),
    path('delete-todo', DeleteTodo.as_view()),
]
