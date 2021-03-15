from django.urls import path
from .views import index

# OPPDATER HVER GANG DU LAGER EN NETTSIDE
urlpatterns = [
    path('', index),
    path('kalender', index),
    path('forste-nettsted', index),
    path('todolist', index),
]