from django.http import JsonResponse
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




@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def review_comment_cr(request, review_pk):
    if request.method == 'GET':
        comments = ReviewComment.objects.filter(review=review_pk)
        serializer = GetReviewCommentSerializer(comments, many=True)
        return Response(serializer.data)
    else:
        serializer = ReviewCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def review_comment_d(request, comment_pk):
    print(comment_pk)
    comment = get_object_or_404(ReviewComment, pk=comment_pk)

    if not request.user.review_comments.filter(pk=comment_pk).exists():
        return Response({'detail': '권한이 없습니다.'})
    comment.delete()
    return Response({ 'id': comment_pk })




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_review(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if review.like_users.filter(pk=request.user.pk).exists():
        review.like_users.remove(request.user)
    else:
        review.like_users.add(request.user)
    serializer = GetReviewSerializer(review)
    return Response(serializer.data,status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_like(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.user in review.like_users.all():
        isLike = True
    else:
        isLike = False
   
    return JsonResponse({'isLike': isLike})




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def pick_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.users_playlist.filter(pk=request.user.pk).exists():
        movie.users_playlist.remove(request.user)
    else:
        movie.users_playlist.add(request.user)
    serializer = MovieSerializer(movie)
    return Response(serializer.data,status=status.HTTP_201_CREATED)



