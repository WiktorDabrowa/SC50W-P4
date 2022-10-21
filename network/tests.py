from django.test import TestCase
from .models import User, Post
# Create your tests here.

def SocialNetworkTestCase(TestCase):
  def SocialNetworkTest(self):
    def setUp():
      # Create some users:
      u1 = User.objects.create()
