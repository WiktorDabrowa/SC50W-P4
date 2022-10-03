from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    is_following = models.ManyToManyField('self', symmetrical=False, related_name='followed_by')
    followers = models.ManyToManyField('self', symmetrical=False)
    
    def __str__(self):
        return f'{self.username}'
    
class Post(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    timestamp = models.DateTimeField(auto_now_add=True)
    body = models.TextField(max_length=300)
    likes = models.ManyToManyField(User, related_name='likes')

        