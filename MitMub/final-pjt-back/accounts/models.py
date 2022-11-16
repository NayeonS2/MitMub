from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail

# def genre_default():
#     return {'12': 0, '14': 0, '16': 0, '18': 0, '27': 0, '28': 0, '35': 0, '36': 0, '37': 0, '53':0, '80': 0, '99':0, '878':0, '9648':0, '10402':0, '10749':0, '10751':0, '10752':0, '10770':0 }

class User(AbstractUser):
    #genre_dict = models.JSONField(default=genre_default)
    profileurl = models.CharField(max_length=200)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    image = ProcessedImageField(blank=True,
                                processors=[Thumbnail(150, 200)],
                                format='JPEG',
                                options={'quality': 90})