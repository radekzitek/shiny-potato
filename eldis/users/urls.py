from django.urls import path
from . import views

urlpatterns = [
    path('me/', views.user_me, name='user-me'),
]
