from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('movies/', views.movies_cr),
    path('movies/<int:movieId>/', views.movie_detail),

    path('movies/create_review/<int:movie_pk>/', views.movie_review_cr),
    path('movies/update_review/<int:review_pk>/', views.movie_review_ud),
    path('movies/review/', views.movie_review_list),

    path('movies/create_comment/<int:review_pk>/', views.review_comment_cr),
    path('movies/delete_comment/<int:comment_pk>/', views.review_comment_d),

    path('movies/like_review/<int:review_pk>/', views.like_review),
    path('movies/check_like/<int:review_pk>/', views.check_like),

    path('movies/pick_movie/<int:movie_pk>/', views.pick_movie),

    path('movies/highrate/', views.high_rate_movies),
    path('movies/new/', views.new_movies),
    path('movies/upcoming/', views.upcoming_movies),
    path('movies/long/', views.long_movies),
]