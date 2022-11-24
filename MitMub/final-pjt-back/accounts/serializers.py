from rest_framework import serializers
from django.contrib.auth import get_user_model



User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField()
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'profileurl')

class UserFollowSerializer(serializers.ModelSerializer):
    password = serializers.CharField()
    followers = UserSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'profileurl' ,'followings', 'followers')