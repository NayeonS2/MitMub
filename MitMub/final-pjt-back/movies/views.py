
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
from .serializers import MovieSerializer, MovieCommentSerializer, GetMovieCommentSerializer, ReviewSerializer, ReviewCommentSerializer, GetReviewSerializer, GetReviewCommentSerializer
from .models import Movie, MovieComment, Review, ReviewComment
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

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def movie_detail(request, movieId):
    if request.method == 'GET':
        movie = Movie.objects.get(id=movieId)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


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


# review 관련 함수

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def movie_review_cr(request, movie_pk):
    if request.method == 'GET':
        reviews = Review.objects.filter(movie=movie_pk)
        serializer = GetReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    else:
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def movie_review_ud(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'DELETE':
        if not request.user.user_reviews.filter(pk=review_pk).exists():
            return Response({'detail': '권한이 없습니다.'})
        review.delete()
        return Response({ 'id': review_pk })
    else:
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie_review_list(request):
    if request.method == 'GET':
        reviews = Review.objects.all()
        serializer = GetReviewSerializer(reviews, many=True)
        return Response(serializer.data)
   