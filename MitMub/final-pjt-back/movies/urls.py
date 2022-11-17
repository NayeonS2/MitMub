from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('movies/', views.movies_cr),
    path('movies/highrate/', views.high_rate_movies),
    path('movies/new/', views.new_movies),
]