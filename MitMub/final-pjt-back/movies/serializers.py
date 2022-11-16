from rest_framework import serializers
from .models import Movie
from django.contrib.auth import get_user_model


class MovieSerializer(serializers.ModelSerializer):
    like_users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = fields = ['id', 'title', 'release_date', 'popularity', 'vote_count', 'vote_average', 'overview', 'poster_path', 'genres', 'like_users', 'users_playlist']