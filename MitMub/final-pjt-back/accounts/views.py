import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, UserFollowSerializer
from django.contrib.auth import get_user_model
from .models import User

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

#from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
from urllib.parse import quote_plus
import random
from django.http import HttpResponse

from django.contrib.auth.hashers import check_password
# @api_view(['POST'])
# def signup(request):
#     password = request.data.get('password')
#     password_confirmation = request.data.get('passwordConfirmation')
#     username = request.data.get('username')
#     if password != password_confirmation:
#         return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
#     # 입력받은 username이 발견가능하면 중복된것
#     try:
#         user = User.objects.get(username=username)
#         return Response({'error': '중복되는 아이디입니다.'})
#     except Exception:
#         pass

#     img_url = f'https://avatars.dicebear.com/api/identicon/{username}.svg'
#     request.data['profileurl'] = img_url

#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         user = serializer.save()
#         user.set_password(request.data.get('password'))
#         user.save()
#     return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_user(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def profile(request, username):
    person = get_object_or_404(get_user_model(),username=username)
    serializer = UserFollowSerializer(person)
    return Response(serializer.data)


@api_view(['GET'])
def profile_list(request):
    people = User.objects.all()
    serializer = UserFollowSerializer(people, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    user = request.user
    if person != user:
        if person.followers.filter(username=user.username).exists():
            person.followers.remove(user)
            user.followings.remove(person)
            
            
        else:
            person.followers.add(user)
            user.followings.add(person)
        Yourserializer = UserFollowSerializer(person)
        Myserializer = UserFollowSerializer(user)
        return Response({'yours':Yourserializer.data,'mine':Myserializer.data}, status=status.HTTP_201_CREATED)
                                            
    else:
        return Response({'detail': '본인을 팔로우 할 수 없습니다.'})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_follow(request, username):
    person = get_object_or_404(get_user_model(), username=username)

    if request.user in person.followers.all():
        IFollow = True
        
    else:
        IFollow = False
    
    
    return JsonResponse({'IFollow': IFollow})
  


def follow_num(request, username):
    person = get_object_or_404(get_user_model(), username=username)


    followers_num = len(person.followers.all())
    followings_num = len(person.followings.all())
  
    
    return JsonResponse({'followers_num': followers_num, 'followings_num':followings_num})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_follow(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    user = request.user
    if person != user:
        if person.followers.filter(username=user.username).exists():
            user.followings.remove(person)
            #person.followers.remove(user)
            
            
        else:
            user.followings.add(person)
            #person.followers.add(user)
        serializer = UserFollowSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
                                            
