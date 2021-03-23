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
    path('prosjekt', index),
]