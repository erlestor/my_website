from django.urls import path
from .views import EventView, TodoView, CreateTodoView

urlpatterns = [
    # hvert element blir på formen:
    # path('room', RoomView.as_view()),
    path('calendar', EventView.as_view()),
    path('todos', TodoView.as_view()),
    path('create-todo', CreateTodoView.as_view()),
]
