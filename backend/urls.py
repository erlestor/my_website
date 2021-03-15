from django.urls import path
from .views import EventView

urlpatterns = [
    # hvert element blir på formen:
    # path('room', RoomView.as_view()),
    path('', EventView.as_view()),
]
