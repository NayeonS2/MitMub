from rest_framework import serializers
from .models import Movie, MovieComment, Review, ReviewComment, Genre
from django.contrib.auth import get_user_model


class MovieSerializer(serializers.ModelSerializer):
    like_users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = fields = ['id', 'title', 'release_date', 'popularity', 'vote_count', 'vote_average', 'overview', 'poster_path', 'genres', 'like_users', 'users_playlist']


class ReviewSerializer(serializers.ModelSerializer):
    like_users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'movie', 'like_users', 'title', 'content', 'rank']


class GetReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class MovieCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieComment
        exclude = ['user', 'created_at', 'updated_at']


class GetMovieCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieComment
        fields = '__all__'


class ReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewComment
        exclude = ['user', 'created_at', 'updated_at']


class GetReviewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewComment
        fields = '__all__'