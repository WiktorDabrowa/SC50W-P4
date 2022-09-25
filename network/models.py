from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    pass

class Post(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    timestamp = models.DateTimeField(auto_now_add=True)
    body = models.TextField(max_length=300)
    likes = models.PositiveIntegerField(default=0)
    