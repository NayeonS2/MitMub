import urllib.request
from pprint import pprint
import json
from decouple import config

API_KEY = config('API_KEY')
HOST = "https://api.themoviedb.org"
MOVIE_LIST_URI = "/3/movie/popular"
MOVIE_INFO_URI = "/3/movie/"
GENRE_LIST_URI = "/3/genre/movie/list"
NOW_MOVIE_URL = "/3/movie/now_playing"
UPCOMING_MOVIE_URL = "/3/movie/upcoming"

movie_list = []
movie_Ids = []
genre_list = []
now_movie_list = []
upcoming_movie_list = []

