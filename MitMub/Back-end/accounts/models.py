from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import Thumbnail


class User(AbstractUser):
    profileurl = models.CharField(max_length=200)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    image = ProcessedImageField(blank=True,
                                processors=[Thumbnail(150, 200)],
                                format='JPEG',
                                options={'quality': 90})