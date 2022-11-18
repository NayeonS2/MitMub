
import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
# from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import MovieSerializer
from .models import Movie
from django.db.models import Q
# Create your views here.


@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
def movies_cr(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    else:
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
def high_rate_movies(request):
    if request.method == 'GET':
        movies = Movie.objects.order_by('-vote_average')
        

        serializer = MovieSerializer(movies, many=True)

        return Response(serializer.data)
    else:
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
def new_movies(request):
    if request.method == 'GET':
        now = datetime.datetime.now()
        #print(datetime.date(now.year, now.month, now.day))

        new = [] 
        movies = Movie.objects.all()

        for movie in movies:
            r_y,r_m,r_d = movie.release_date.split('-')
            #print(datetime.date(int(r_y), int(r_m), int(r_d)))
            if datetime.date(now.year, now.month, now.day) >= datetime.date(int(r_y), int(r_m), int(r_d)):
                new.append(movie)
       
       
        serializer = MovieSerializer(new, many=True)
        return Response(serializer.data)
    else:
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
def upcoming_movies(request):
    if request.method == 'GET':
        now = datetime.datetime.now()
        #print(datetime.date(now.year, now.month, now.day))

        upcoming = [] 
        movies = Movie.objects.all()

        for movie in movies:
            r_y,r_m,r_d = movie.release_date.split('-')
            #print(datetime.date(int(r_y), int(r_m), int(r_d)))
            if datetime.date(now.year, now.month, now.day) < datetime.date(int(r_y), int(r_m), int(r_d)):
                upcoming.append(movie)
       
       
        serializer = MovieSerializer(upcoming, many=True)
        return Response(serializer.data)
    else:
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
def long_movies(request):
    if request.method == 'GET':
        movies = Movie.objects.filter(runtime__gte=120)
        
        # for movie in movies:
        #     print(movie.runtime)

        serializer = MovieSerializer(movies, many=True)

        return Response(serializer.data)
    else:
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)