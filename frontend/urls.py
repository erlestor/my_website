from django.urls import path
from .views import index

# OPPDATER HVER GANG DU LAGER EN NETTSIDE
urlpatterns = [
    path('', index),
    path('forste-nettsted', index),
    path('todolist', index),
    path('prosjekt/kalender', index),
    path('prosjekt/todolist', index),
    path('prosjekt/forste-nettsted', index),
    path('prosjekt/counter', index),
    path('prosjekt/bored', index),
    path('prosjekt/minesweeper', index),
    path('prosjekt/pathfinding', index),
    path('prosjekt/sorting', index),
    path('prosjekt/dolla', index),
    path('prosjekt/dolla/signin', index),
    path('prosjekt/musikk-lobby', index),
    path('prosjekt/musikk-lobby/info', index),
    path('prosjekt/musikk-lobby/create', index),
    path('prosjekt/musikk-lobby/join', index),
    path('prosjekt/musikk-lobby/room/<str:roomCode>', index),
    path('prosjekt', index),
    path('nettsteder', index),
]